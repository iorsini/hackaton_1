// ===== CONSTANTES FIXAS =====
const express = require("express");
const next = require("next");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/lib/db");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

// 🔥 MODELO DE SALA
const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true, min: 1 },
    resources: { type: [String], default: [] },
    image: { type: String, default: "" },
    location: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 🔥 MODELO DE RESERVA
const ReservationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room", // ← Nome correto
      required: true,
    },
    userName: { type: String, required: true, trim: true },
    userEmail: { type: String, required: true, trim: true, lowercase: true },
    date: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true, min: 1 },
    purpose: { type: String, required: true, trim: true },
    selectedResources: { type: [String], default: [] },
    status: { type: String, enum: ["active", "cancelled"], default: "active" },
  },
  { timestamps: true }
);

// 🔥 REGISTRAR MODELOS (IMPORTANTE: nome 'Room' em ambos)
const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
const Reservation =
  mongoose.models.Reservation ||
  mongoose.model("Reservation", ReservationSchema);

console.log("📦 Modelos registrados:", Object.keys(mongoose.models));

// ===== ENDPOINTS =====

// GET /api/salas
app.get("/api/salas", async (req, res) => {
  try {
    console.log("🔍 Buscando salas...");
    const salas = await Room.find({});
    console.log(`✅ Encontradas ${salas.length} salas`);
    res.json(salas);
  } catch (error) {
    console.error("❌ Erro ao carregar salas:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// GET /api/salas/:id
app.get("/api/salas/:id", async (req, res) => {
  try {
    console.log("🔍 Buscando sala:", req.params.id);
    const sala = await Room.findById(req.params.id);
    if (!sala) {
      console.log("❌ Sala não encontrada");
      return res.status(404).json({ erro: "Sala não encontrada" });
    }
    console.log("✅ Sala encontrada:", sala.name);
    res.json(sala);
  } catch (error) {
    console.error("❌ Erro ao carregar sala:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// GET /api/bookings
app.get("/api/bookings", async (req, res) => {
  try {
    console.log("🔍 Buscando reservas...");
    const bookings = await Reservation.find({ status: "active" }).populate(
      "room"
    );
    console.log(`✅ Encontradas ${bookings.length} reservas`);
    res.json(bookings);
  } catch (error) {
    console.error("❌ Erro ao carregar reservas:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// GET /api/salas/:id/bookings
app.get("/api/salas/:id/bookings", async (req, res) => {
  try {
    const bookings = await Reservation.find({
      room: req.params.id,
      status: "active",
    });
    res.json(bookings);
  } catch (error) {
    console.error("❌ Erro ao carregar reservas:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// GET /api/salas/:id/available-dates
app.get("/api/salas/:id/available-dates", async (req, res) => {
  try {
    const bookings = await Reservation.find({
      room: req.params.id,
      status: "active",
    });
    const unavailableDates = bookings.map((b) => {
      const date = new Date(b.date);
      return date.toISOString().split("T")[0];
    });
    res.json({ unavailableDates });
  } catch (error) {
    console.error("❌ Erro ao carregar datas:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// POST /api/salas/:id/booking
app.post("/api/salas/:id/booking", async (req, res) => {
  try {
    console.log("📝 Recebendo reserva:", req.body);

    const { userName, userEmail, date, purpose, numberOfPeople } = req.body;

    if (!userName || !userEmail || !date || !purpose || !numberOfPeople) {
      return res.status(400).json({
        success: false,
        error: "Dados incompletos",
      });
    }

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const existingBooking = await Reservation.findOne({
      room: req.params.id,
      date: { $gte: selectedDate, $lt: nextDay },
      status: "active",
    });

    if (existingBooking) {
      return res.status(409).json({
        success: false,
        error: `Sala já reservada para ${selectedDate.toLocaleDateString(
          "pt-PT"
        )}`,
      });
    }

    const roomData = await Room.findById(req.params.id);
    if (!roomData) {
      return res
        .status(404)
        .json({ success: false, error: "Sala não encontrada" });
    }

    if (numberOfPeople > roomData.capacity) {
      return res.status(400).json({
        success: false,
        error: `Esta sala suporta no máximo ${roomData.capacity} pessoas`,
      });
    }

    const newBooking = new Reservation({
      room: req.params.id,
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      date: selectedDate,
      purpose: purpose.trim(),
      numberOfPeople: parseInt(numberOfPeople),
      selectedResources: req.body.selectedResources || [],
      status: "active",
    });

    const savedBooking = await newBooking.save();
    const populatedBooking = await Reservation.findById(
      savedBooking._id
    ).populate("room");

    console.log("✅ Reserva criada com sucesso!");

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    console.error("❌ Erro ao criar reserva:", error);
    res.status(500).json({
      success: false,
      error: "Erro interno",
      detalhes: error.message,
    });
  }
});

// POST /api/salas
app.post("/api/salas", async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error("❌ Erro ao criar sala:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// DELETE /api/bookings/:id
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    console.log("🗑️ Tentando deletar reserva:", req.params.id);

    const deletedBooking = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedBooking) {
      console.log("❌ Reserva não encontrada");
      return res.status(404).json({ erro: "Reserva não encontrada" });
    }

    console.log("✅ Reserva deletada:", deletedBooking._id);
    res.status(204).send();
  } catch (error) {
    console.error("❌ Erro ao deletar reserva:", error);
    res.status(500).json({ erro: "Erro interno", detalhes: error.message });
  }
});

// 🧹 Limpar reservas órfãs (sem sala)
app.delete("/api/bookings/cleanup", async (req, res) => {
  try {
    const result = await Reservation.deleteMany({
      $or: [{ room: null }, { room: { $exists: false } }],
    });
    console.log(`🧹 Removidas ${result.deletedCount} reservas órfãs`);
    res.json({
      message: "Reservas órfãs removidas com sucesso!",
      count: result.deletedCount,
    });
  } catch (error) {
    console.error("Erro ao limpar:", error);
    res.status(500).json({ erro: error.message });
  }
});

// ===== INICIALIZAÇÃO =====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB conectado!");

    await nextApp.prepare();
    console.log("✅ Next.js preparado!");

    app.listen(PORT, () => {
      console.log(`\n🐝 ========================================`);
      console.log(`🐝 Servidor Honeycomb rodando!`);
      console.log(`🐝 URL: http://localhost:${PORT}`);
      console.log(`🐝 ========================================\n`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar servidor:", error);
    process.exit(1);
  }
};

iniciarServidor();
