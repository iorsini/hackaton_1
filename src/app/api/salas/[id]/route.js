import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Room from '@/models/Room';

// GET /api/salas/[id] - Detalhes da sala
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    
    const sala = await Room.findById(id);
    
    if (!sala) {
      return NextResponse.json(
        { erro: 'Sala não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(sala);
  } catch (error) {
    console.error('❌ Erro ao carregar sala:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}