import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Room from '@/models/Room';

// GET /api/salas - Listar todas as salas
export async function GET() {
  try {
    await connectDB();
    const salas = await Room.find({}).sort({ createdAt: -1 });
    return NextResponse.json(salas);
  } catch (error) {
    console.error('❌ Erro ao carregar salas:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}

// POST /api/salas - Criar nova sala
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const newRoom = new Room(body);
    const savedRoom = await newRoom.save();
    
    return NextResponse.json(savedRoom, { status: 201 });
  } catch (error) {
    console.error('❌ Erro ao criar sala:', error);
    return NextResponse.json(
      { erro: 'Erro interno', detalhes: error.message },
      { status: 500 }
    );
  }
}