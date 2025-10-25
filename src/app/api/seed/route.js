import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Room from '@/models/Room';

const sampleRooms = [
  {
    name: 'Sala de Reuniões Principal',
    description: 'Espaço amplo e moderno, ideal para reuniões de equipe e apresentações importantes.',
    capacity: 12,
    resources: ['WiFi', 'Projetor', 'Quadro Branco', 'Videoconferência'],
    image: '/images/rooms/sala_reunioes_principal.png',
    isActive: true,
    location: 'Piso 1',
  },
  {
    name: 'Sala de Brainstorming',
    description: 'Ambiente criativo e inspirador, perfeito para sessões de ideação e trabalho colaborativo.',
    capacity: 8,
    resources: ['WiFi', 'Quadro Branco', 'Post-its', 'Café'],
    image: '/images/rooms/sala_brainstorming.png',
    isActive: true,
    location: 'Piso 2',
  },
  {
    name: 'Sala de Conferências',
    description: 'Sala executiva para reuniões formais e videoconferências com clientes.',
    capacity: 20,
    resources: ['WiFi', 'Projetor', 'Sistema de Som', 'Videoconferência', 'Café'],
    image: '/images/rooms/sala_conferencias.png',
    isActive: true,
    location: 'Piso 3',
  },
  {
    name: 'Sala de Trabalho Colaborativo',
    description: 'Espaço flexível para trabalho em equipe e workshops.',
    capacity: 15,
    resources: ['WiFi', 'Quadro Branco', 'Mesas Modulares'],
    image: '/images/rooms/sala_trabalho_colaborativo.png',
    isActive: true,
    location: 'Piso 2',
  },
  {
    name: 'Sala Privada',
    description: 'Pequeno espaço reservado para reuniões individuais ou chamadas privadas.',
    capacity: 4,
    resources: ['WiFi', 'Monitor'],
    image: '/images/rooms/sala_privada.png',
    isActive: true,
    location: 'Piso 1',
  },
  {
    name: 'Auditório',
    description: 'Grande espaço para eventos, palestras e apresentações para audiências maiores.',
    capacity: 50,
    resources: ['WiFi', 'Projetor', 'Sistema de Som', 'Microfones', 'Palco'],
    image: '/images/rooms/auditorio.png',
    isActive: true,
    location: 'Piso Térreo',
  },
];

// GET /api/seed - Popular banco de dados
export async function GET() {
  try {
    await connectDB();
    
    // Verificar se já existem salas
    const existingRooms = await Room.countDocuments();
    
    if (existingRooms > 0) {
      return NextResponse.json({ 
        message: `Banco já possui ${existingRooms} salas. Delete-as primeiro se quiser recriar.`,
        existingRooms 
      });
    }

    // Inserir salas
    const insertedRooms = await Room.insertMany(sampleRooms);
    
    return NextResponse.json({ 
      success: true,
      message: `✅ ${insertedRooms.length} salas criadas com sucesso!`,
      rooms: insertedRooms 
    });
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/seed - Limpar todas as salas (use com cuidado!)
export async function DELETE() {
  try {
    await connectDB();
    const result = await Room.deleteMany({});
    
    return NextResponse.json({ 
      success: true,
      message: `🗑️ ${result.deletedCount} salas removidas`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('❌ Erro ao limpar banco:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}