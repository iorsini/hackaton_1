import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// DELETE /api/bookings/[id] - Cancelar reserva
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const reserva = await Reservation.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );
    
    if (!reserva) {
      return NextResponse.json(
        { erro: 'Reserva não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Reserva cancelada com sucesso',
      data: reserva 
    });
  } catch (error) {
    console.error('❌ Erro ao cancelar reserva:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}