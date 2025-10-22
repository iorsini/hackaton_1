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

// GET /api/bookings - Retorna todas as reservas ativas
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await booking.find({ status: 'active' }).populate('room');
    res.json(bookings);
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/salas/:id/bookings - Retorna reservas de uma sala específica
app.get('/api/salas/:id/bookings', async (req, res) => {
  try {
    const bookings = await booking.find({ 
      room: req.params.id,
      status: 'active'
    });
    res.json(bookings);
  } catch (error) {
    console.error('Erro ao carregar reservas:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// GET /api/salas/:id/available-dates - Retorna datas disponíveis para uma sala
app.get("/api/salas/:id/available-dates", async (req, res) => {
  try {
    const bookings = await booking.find({ 
      room: req.params.id,
      status: 'active'
    });
    const unavailableDates = bookings.map(b => {
      const date = new Date(b.date);
      return date.toISOString().split('T')[0];
    });
    res.json({ unavailableDates });
  } catch (error) {
    console.error('Erro ao carregar datas disponíveis:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
});

// POST /api/salas/:id/booking - Cria uma nova reserva para uma sala específica
app.post('/api/salas/:id/booking', async (req, res) => {
  try {
    // Normalizar a data para início do dia
    const selectedDate = new Date(req.body.date);
    selectedDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Verificar se já existe reserva ativa para este dia
    const existingBooking = await booking.findOne({
      room: req.params.id,
      date: { $gte: selectedDate, $lt: nextDay },
      status: 'active'
    });

    if (existingBooking) {
      return res.status(409).json({ 
        success: false,
        error: `Esta sala já está reservada para ${selectedDate.toLocaleDateString('pt-PT')}` 
      });
    }

    // Verificar capacidade
    const roomData = await room.findById(req.params.id);
    if (req.body.numberOfPeople > roomData.capacity) {
      return res.status(400).json({
        success: false,
        error: `Esta sala suporta no máximo ${roomData.capacity} pessoas`
      });
    }

    const newBooking = new booking({
      room: req.params.id,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      date: selectedDate,
      purpose: req.body.purpose,
      numberOfPeople: req.body.numberOfPeople,
      selectedResources: req.body.selectedResources || [],
      status: 'active'
    });

    const savedBooking = await newBooking.save();
    const populatedBooking = await booking.findById(savedBooking._id).populate('room');
    
    res.status(201).json({ 
      success: true, 
      data: populatedBooking 
    });
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro interno do servidor' 
    });
  }
});

// POST /api/salas - Cria uma nova sala
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

// ===== INICIALIZAÇÃO DO SERVIDOR =====

app.use((req, res) => {
  return handle(req, res);
});

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await connectDB();
    await nextApp.prepare();
    app.listen(PORT, () => {
      console.log(`🐝 Servidor Honeycomb rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

iniciarServidor();