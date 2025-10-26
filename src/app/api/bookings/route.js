import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// 🔥 FORÇA DYNAMIC RENDERING (sem cache)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET /api/bookings - Listar todas as reservas ativas
export async function GET() {
  try {
    await connectDB();
    
    console.log('📊 Buscando reservas no MongoDB...');
    
    // 🔥 CORREÇÃO: Usar lean() e executar query fresca
    const reservas = await Reservation.find({ status: 'active' })
      .populate('room', 'name capacity location resources')
      .sort({ date: 1 })
      .lean() // Converte para objeto JS puro
      .exec(); // Força execução fresca
    
    console.log('✅ Reservas encontradas:', reservas.length);
    
    // 🔥 CRITICAL: Adicionar timestamp para evitar cache do browser
    const response = NextResponse.json(reservas, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Timestamp': new Date().toISOString(), // Header custom para debug
      },
    });
    
    return response;
  } catch (error) {
    console.error('❌ Erro ao carregar reservas:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}