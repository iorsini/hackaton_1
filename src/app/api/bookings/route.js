import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// GET /api/bookings - Listar todas as reservas ativas
export async function GET() {
  try {
    await connectDB();
    
    const reservas = await Reservation.find({ status: 'active' })
      .populate('room')
      .sort({ date: 1 });
    
    return NextResponse.json(reservas);
  } catch (error) {
    console.error('❌ Erro ao carregar reservas:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}