'use client';

import { useState, useEffect } from 'react';
import RoomCard from '@/components/RoomCard';
import ReservationModal from '@/components/ReservationModal';
import { Calendar, Search } from 'lucide-react';
import { getRooms } from '../services/api';

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      if (data) setRooms(data);
    } catch (error) {
      console.error('Erro ao carregar salas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-10 px-4">
      {/* Abelhas animadas de fundo */}
      <div className="absolute top-20 left-10 animate-bounce opacity-20" style={{ animationDuration: '3s' }}>🐝</div>
      <div className="absolute top-40 right-20 animate-bounce opacity-20" style={{ animationDelay: '1s', animationDuration: '4s' }}>🐝</div>
      <div className="absolute bottom-40 left-1/4 animate-bounce opacity-20" style={{ animationDelay: '2s', animationDuration: '5s' }}>🐝</div>

      {/* Padrão hexagonal leve no fundo */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L15 5 L15 15 L10 20 L5 15 L5 5 Z" fill="none" stroke="#FFB94F" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>

      {/* Conteúdo da página */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Encontre o Espaço Perfeito</h1>
          <p className="text-xl text-gray-600 mb-8">
            Reserve salas, recursos e itens para o seu próximo evento
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Calendar className="text-primary-500 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">{rooms.length}</h3>
            <p className="text-gray-600">Salas Disponíveis</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Calendar className="text-primary-500 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
            <p className="text-gray-600">Acesso ao Sistema</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <Calendar className="text-primary-500 mb-2" size={32} />
            <h3 className="text-2xl font-bold text-gray-900">Instantâneo</h3>
            <p className="text-gray-600">Confirmação</p>
          </div>
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            <p className="mt-4 text-gray-600">A carregar salas...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nenhuma sala encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                onReserve={() => setSelectedRoom(room)}
              />
            ))}
          </div>
        )}

        {/* Reservation Modal */}
        {selectedRoom && (
          <ReservationModal
            room={selectedRoom}
            onClose={() => setSelectedRoom(null)}
            onSuccess={() => {
              setSelectedRoom(null);
              fetchRooms();
            }}
          />
        )}
      </div>
    </div>
  );
}