// ===== CONSTANTES FIXAS =====
const express = require('express');
const next = require('next');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/lib/db');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
app.use(cors());
app.use(express.json());
const {default: booking} = require('./src/models/Reservation');
const { default: room } = require('./src/models/Room');


// ===== ENDPOINTS DA API =====

// GET /api/salas - Retorna todas as salas
app.get('/api/salas', async (req, res) => {
  try {
    const salas = await room.find();
    res.json(salas);
  } catch (error) {
    console.error('Erro ao carregar salas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});
// GET /api/salas/:id - Retorna detalhes de uma sala específica
app.get('/api/salas/:id', async (req, res) => {
  try {
    const sala = await room.findById(req.params.id);
    res.json(sala);
  } catch (error) {
    console.error('Erro ao carregar sala:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});
//GET /api/bookings - Retorna todas as reservas
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/salas/:id/booking - Retorna reservas de uma sala específica
app.get('/api/salas/:id/bookings', async (req, res) => {
  try {
    const bookings = await booking.find({ room: req.params.id });
    res.json(bookings);
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});
//para futuro uso - GET /api/salas/:id/available-dates - Retorna datas disponíveis para uma sala específica
app.get("/api/salas/:id/available-dates", async (req, res) => {
  try {
    const bookings = await booking.find({ room: req.params.id });
    const unavailableDates = bookings.map(booking => booking.date);
    res.json({ availableDates: getAvailableDates(unavailableDates) });
  } catch (error) {
    console.error('Erro ao carregar datas disponíveis:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/salas/:id/booking - Cria uma nova reserva para uma sala específica
app.post('/api/salas/:id/booking', async (req, res) => {
  try {
    const newBooking = new booking({
      room: req.params.id,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      date: req.body.date,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      purpose: req.body.purpose,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.post('/api/salas', async (req, res) => {
  try {
    const newRoom = new room(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const deletedBooking = await booking.findByIdAndDelete(req.params.id);
    if (!deletedBooking) {
      return res.status(404).json({ erro: 'Reserva não encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar reserva:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// ===== INICIALIZAÇÃO DO SERVIDOR (também não se deve mexer)=====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`Servidor Next.js + Express a correr em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();