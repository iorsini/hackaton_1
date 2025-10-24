"use client";

import { useState, useEffect, useMemo } from "react";
import RoomCard from "@/components/RoomCard";
import ReservationModal from "@/components/ReservationModal";
import { Search } from "lucide-react";
import { getRooms } from "../services/api";

// Stats Card Component
const StatsCard = ({ stat, isHovered, onHover }) => (
  <div
    onMouseEnter={() => onHover(stat.id)}
    onMouseLeave={() => onHover(null)}
    className="relative group flex justify-center"
  >
    <div
      className="relative w-32 h-36 sm:w-40 sm:h-44 md:w-48 md:h-52 hover:scale-105 transition-all duration-300"
      style={{
        filter: isHovered
          ? "drop-shadow(0 20px 25px rgba(0,0,0,0.15))"
          : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
      }}
    >
      {/* Hexágono SVG */}
      <svg viewBox="0 0 100 100" className="w-full h-full absolute">
        <defs>
          <linearGradient
            id={`grad-${stat.id}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" style={{ stopColor: "#FFE89F", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#FFD966", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <polygon
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
          fill={`url(#grad-${stat.id})`}
          stroke="#e69500"
          strokeWidth="3"
        />
      </svg>

      {/* Conteúdo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-3 sm:px-4 md:px-6">
        <div
          className="p-2 sm:p-2.5 md:p-3 rounded-xl shadow-lg transform transition-all duration-300 mb-2 sm:mb-2.5 md:mb-3"
          style={{
            backgroundColor: stat.color,
            transform: isHovered
              ? "rotate(12deg) scale(1.15)"
              : "rotate(0deg) scale(1)",
          }}
        >
          <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7">
            {stat.icon}
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] sm:text-xs md:text-xs text-[#8B4513] font-bold mb-0.5 sm:mb-1">
            {stat.label}
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0C0C0C]">
            {stat.value}
          </p>
        </div>
      </div>

      {/* Efeito hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
              fill="rgba(255, 255, 255, 0.2)"
            />
          </svg>
        </div>
      )}
    </div>
  </div>
);

// Floating Bee Component
const FloatingBee = ({ bee }) => (
  <div
    className="absolute animate-float pointer-events-none"
    style={{
      top: bee.top,
      left: bee.left,
      animationDelay: bee.delay,
      animationDuration: bee.duration,
      opacity: bee.opacity,
    }}
  >
    <span className={`text-${bee.size} select-none`}>🐝</span>
  </div>
);

// Footer Component
const Footer = () => (
  <footer className="mt-12 text-center text-sm text-gray-600 px-4">
    <p>© {new Date().getFullYear()} Honeycomb • Sistema de Coworking 🐝</p>
  </footer>
);

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hoverCard, setHoverCard] = useState(null);

  // Gerar abelhas uma única vez
  const bees = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        size: `${Math.floor(Math.random() * 2) + 2}xl`,
        delay: `${(Math.random() * 5).toFixed(1)}s`,
        duration: `${(Math.random() * 4 + 4).toFixed(1)}s`,
        opacity: (Math.random() * 0.3 + 0.2).toFixed(2),
      })),
    []
  );

  // Stats data
  const stats = useMemo(
    () => [
      {
        id: "rooms",
        label: "Salas Disponíveis",
        value: rooms.length,
        color: "#48C957",
        icon: (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
        ),
      },
      {
        id: "access",
        label: "Acesso 24/7",
        value: "",
        color: "#ff8a4fff",
        icon: (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        id: "confirmation",
        label: "Confirmação Instantânea",
        value: "",
        color: "#47c9e0ff",
        icon: (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M9 11l3 3L22 4" strokeLinecap="round" />
            <circle cx="12" cy="15" r="8" />
          </svg>
        ),
      },
    ],
    [rooms.length]
  );

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

  const filteredRooms = useMemo(
    () =>
      rooms.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description?.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [rooms, searchTerm]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-6 sm:py-8 md:py-10 px-4 relative overflow-hidden">
      {/* Abelhas animadas */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden hidden sm:block">
        {bees.map((bee, i) => (
          <FloatingBee key={i} bee={bee} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0C0C0C] mb-2 tracking-tight px-4">
            Encontre o Espaço Perfeito
          </h1>
          <p className="text-base sm:text-lg text-[#48C957] font-medium mb-6 sm:mb-8 px-4">
            Reserve salas, recursos e itens para o seu próximo evento
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 px-4">
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#b36608ff]"
                size={20}
              />
              <input
                type="text"
                placeholder="Pesquisar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-full border-2 border-[#FFB94F] focus:ring-2 focus:ring-[#b36608ff] focus:border-transparent outline-none shadow-lg bg-white text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 px-4">
          {stats.map((stat) => (
            <StatsCard
              key={stat.id}
              stat={stat}
              isHovered={hoverCard === stat.id}
              onHover={setHoverCard}
            />
          ))}
        </div>

        {/* Rooms Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-4 border-[#FFB94F] mx-auto"></div>
            <p className="mt-4 text-[#8B4513] font-medium text-sm sm:text-base">
              A carregar salas...
            </p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl sm:text-6xl mb-4">🔍</div>
            <p className="text-[#8B4513] text-base sm:text-lg font-medium px-4">
              Nenhuma sala encontrada
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room._id}
                room={room}
                onReserve={() => setSelectedRoom(room)}
              />
            ))}
          </div>
        )}

        {/* Modal */}
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

        <Footer />
      </div>
    </div>
  );
}