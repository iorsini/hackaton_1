import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from '../src/models/Room.js';

dotenv.config({ path: '.env' });

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

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    await Room.deleteMany({});
    console.log('🗑️  Salas antigas removidas');

    await Room.insertMany(sampleRooms);
    console.log(`✅ ${sampleRooms.length} salas adicionadas com sucesso!`);

    await mongoose.connection.close();
    console.log('👋 Conexão fechada');
  } catch (error) {
    console.error('❌ Erro:', error);
    process.exit(1);
  }
}

seedDatabase();