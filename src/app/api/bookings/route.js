import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// GET /api/bookings - Listar todas as reservas ativas
export async function GET() {
  try {
    await connectDB();
    
    // 🔥 CORREÇÃO: Adicionar lean() para melhor performance no Vercel
    const reservas = await Reservation.find({ status: 'active' })
      .populate('room', 'name capacity location resources') // Especificar campos
      .sort({ date: 1 })
      .lean(); // Converte para objeto JS simples
    
    console.log('📊 Reservas encontradas:', reservas.length);
    
    return NextResponse.json(reservas, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('❌ Erro ao carregar reservas:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}