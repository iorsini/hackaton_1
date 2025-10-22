// Script para popular o banco de dados com salas de exemplo
// Execute: node seed.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const RoomSchema = new mongoose.Schema({
  name: String,
  description: String,
  capacity: Number,
  resources: [String],
  image: String,
  isActive: Boolean,
  location: String,
});

const Room = mongoose.models.Room || mongoose.model('Room', RoomSchema);

const sampleRooms = [
  {
    name: 'Sala de Reuniões Principal',
    description: 'Espaço amplo e moderno, ideal para reuniões de equipe e apresentações importantes.',
    capacity: 12,
    resources: ['WiFi', 'Projetor', 'Quadro Branco', 'Videoconferência'],
    image: '',
    isActive: true,
    location: 'Piso 1',
  },
  {
    name: 'Sala de Brainstorming',
    description: 'Ambiente criativo e inspirador, perfeito para sessões de ideação e trabalho colaborativo.',
    capacity: 8,
    resources: ['WiFi', 'Quadro Branco', 'Post-its', 'Café'],
    image: '',
    isActive: true,
    location: 'Piso 2',
  },
  {
    name: 'Sala de Conferências',
    description: 'Sala executiva para reuniões formais e videoconferências com clientes.',
    capacity: 20,
    resources: ['WiFi', 'Projetor', 'Sistema de Som', 'Videoconferência', 'Café'],
    image: '',
    isActive: true,
    location: 'Piso 3',
  },
  {
    name: 'Sala de Trabalho Colaborativo',
    description: 'Espaço flexível para trabalho em equipe e workshops.',
    capacity: 15,
    resources: ['WiFi', 'Quadro Branco', 'Mesas Modulares'],
    image: '',
    isActive: true,
    location: 'Piso 2',
  },
  {
    name: 'Sala Privada',
    description: 'Pequeno espaço reservado para reuniões individuais ou chamadas privadas.',
    capacity: 4,
    resources: ['WiFi', 'Monitor'],
    image: '',
    isActive: true,
    location: 'Piso 1',
  },
  {
    name: 'Auditório',
    description: 'Grande espaço para eventos, palestras e apresentações para audiências maiores.',
    capacity: 50,
    resources: ['WiFi', 'Projetor', 'Sistema de Som', 'Microfones', 'Palco'],
    image: '',
    isActive: true,
    location: 'Piso Térreo',
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado ao MongoDB');

    // Limpar coleção existente (opcional)
    await Room.deleteMany({});
    console.log('🗑️  Salas antigas removidas');

    // Inserir novas salas
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