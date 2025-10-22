"use client";

import { useState, useEffect } from "react";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import { Search } from "lucide-react";
import { getRooms } from "../services/api";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getRooms();
      if (data) setRooms(data);
    } catch (error) {
      console.error("Erro ao carregar salas:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-10 px-4 relative overflow-hidden">
      {/* Abelhas animadas de fundo */}
      {["top-20 left-10 animate-bounce",
        "top-40 right-20 animate-bounce",
        "bottom-40 left-1/4 animate-bounce"
      ].map((cls, i) => (
        <div
          key={i}
          className={`absolute ${cls}`}
          style={{ animationDelay: `${i}s`, animationDuration: `${3 + i}s` }}
        >
          <span className="text-3xl opacity-20">🐝</span>
        </div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <div className="inline-block p-5 mb-6 transform hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40" viewBox="0 0 100 100" fill="none">
              <ellipse cx="50" cy="15" rx="20" ry="8" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="28" rx="28" ry="10" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="43" rx="35" ry="11" fill="#e5a740" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="58" rx="38" ry="12" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="74" rx="32" ry="10" fill="#e5a740" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="87" rx="25" ry="9" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
              <ellipse cx="50" cy="58" rx="6" ry="8" fill="#0C0C0C"/>
            </svg>
          </div>

          <h1 className="text-5xl font-bold text-[#0C0C0C] mb-4">🐝 Encontre o Espaço Perfeito</h1>
          <p className="text-xl text-[#48C957] mb-8 font-medium">Reserve salas, recursos e itens para o seu próximo evento</p>

          {/* Padrão hexagonal de fundo */}
          <div className="absolute -z-10 inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10 0 L15 5 L15 15 L10 20 L5 15 L5 5 Z" fill="none" stroke="#FFB94F" strokeWidth="0.5"/>
              </pattern>
              <rect width="100" height="100" fill="url(#hexagons)" />
            </svg>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-honey-dark" size={20}/>
              <input
                type="text"
                placeholder="Pesquisar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-honey-primary focus:ring-2 focus:ring-honey-dark focus:border-transparent outline-none shadow-lg bg-white"
              />
            </div>
          </div>
        </div>

        {/* Stats Hexagonais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { id: "rooms", label: "Salas Disponíveis", value: rooms.length, color: "#48C957", icon: <span>🏢</span> },
            { id: "access", label: "Acesso 24/7", value: "Sim", color: "#ff8a4fff", icon: <span>🔑</span> },
            { id: "confirmation", label: "Confirmação Instantânea", value: "✔️", color: "#47c9e0ff", icon: <span>📩</span> }
          ].map((stat) => (
            <div key={stat.id} className="relative group flex justify-center">
              <div className="relative w-48 h-52 hover:scale-105 transition-all duration-300">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                  <defs>
                    <linearGradient id={`grad-${stat.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#FFE89F", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#FFD966", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill={`url(#grad-${stat.id})`} stroke="#b36608ff" strokeWidth="3"/>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
                  <div className="p-3 rounded-xl shadow-lg transform transition-all duration-300 mb-3" style={{ backgroundColor: stat.color }}>
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#8B4513] font-bold mb-1">{stat.label}</p>
                    <p className="text-4xl font-bold text-[#0C0C0C]">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Grid de Salas */}
        {loading ? (
          <div className="text-center py-12">
            <p className="mt-4 text-honey-brown font-medium">A carregar salas...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-honey-brown text-lg font-medium">Nenhuma sala encontrada</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room._id} room={room} onReserve={() => setSelectedRoom(room)} />
            ))}
          </div>
        )}

        {/* Modal de Reserva */}
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

      {/* Rodapé */}
      <div className="text-center mt-12 pb-8 relative z-10">
        <p className="text-[#0C0C0C] opacity-50 text-sm">🍯 Feito com muito mel pela equipe Honeycomb</p>
      </div>
    </div>
  );
}