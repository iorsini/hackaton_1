import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Reservation from '@/models/Reservation';

// 🔥 FORÇA DYNAMIC RENDERING
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// DELETE /api/bookings/[id] - Cancelar reserva (DELETAR DE VERDADE)
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    console.log('🗑️ Tentando deletar reserva:', id);
    
    // 🔥 CORREÇÃO: Deletar de verdade
    const reserva = await Reservation.findByIdAndDelete(id);
    
    if (!reserva) {
      console.log('❌ Reserva não encontrada:', id);
      return NextResponse.json(
        { erro: 'Reserva não encontrada' },
        { status: 404 }
      );
    }
    
    console.log('✅ Reserva deletada com sucesso:', id);
    
    // 🔥 CRITICAL: Revalidar cache do Next.js
    revalidatePath('/api/bookings');
    revalidatePath('/admin');
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Reserva cancelada com sucesso',
        data: reserva 
      },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error) {
    console.error('❌ Erro ao cancelar reserva:', error);
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