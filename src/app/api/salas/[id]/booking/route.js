import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Room from '@/models/Room';
import Reservation from '@/models/Reservation';

// POST /api/salas/[id]/booking - Criar reserva
export async function POST(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await request.json();
    
    const { userName, userEmail, date, purpose, numberOfPeople, selectedResources } = body;

    // Validações básicas
    if (!userName || !userEmail || !date || !purpose || !numberOfPeople) {
      return NextResponse.json(
        { success: false, error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Verificar se sala existe
    const roomData = await Room.findById(id);
    if (!roomData) {
      return NextResponse.json(
        { success: false, error: 'Sala não encontrada' },
        { status: 404 }
      );
    }

    // Validar capacidade
    if (numberOfPeople > roomData.capacity) {
      return NextResponse.json(
        { 
          success: false, 
          error: `Esta sala suporta no máximo ${roomData.capacity} pessoas` 
        },
        { status: 400 }
      );
    }

    // Normalizar data (início do dia)
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // Verificar conflito de datas
    const existingBooking = await Reservation.findOne({
      room: id,
      date: { $gte: selectedDate, $lt: nextDay },
      status: 'active',
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          error: `Esta sala já está reservada para ${selectedDate.toLocaleDateString('pt-PT')}`,
        },
        { status: 409 }
      );
    }

    // Criar reserva
    const newBooking = new Reservation({
      room: id,
      userName: userName.trim(),
      userEmail: userEmail.trim().toLowerCase(),
      date: selectedDate,
      purpose: purpose.trim(),
      numberOfPeople: parseInt(numberOfPeople),
      selectedResources: selectedResources || [],
      status: 'active',
    });

    const savedBooking = await newBooking.save();
    const populatedBooking = await Reservation.findById(savedBooking._id).populate('room');

    console.log('✅ Reserva criada com sucesso!');

    return NextResponse.json(
      { success: true, data: populatedBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('❌ Erro ao criar reserva:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}