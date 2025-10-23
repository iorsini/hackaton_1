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
  const [hoverCard, setHoverCard] = useState(null);
  const [bees, setBees] = useState([]);

  useEffect(() => {
    fetchRooms();

    // Gera posições das abelhas uma única vez
    const generatedBees = Array.from({ length: 15 }).map(() => {
      const top = `${Math.random() * 90}%`;
      const left = `${Math.random() * 90}%`;
      const size = `${Math.floor(Math.random() * 3) + 3}xl`;
      const delay = `${(Math.random() * 5).toFixed(1)}s`;
      const duration = `${(Math.random() * 4 + 4).toFixed(1)}s`;
      const opacity = (Math.random() * 0.3 + 0.2).toFixed(2);
      return { top, left, size, delay, duration, opacity };
    });
    setBees(generatedBees);
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

  const stats = [
    {
      id: "rooms",
      label: "Salas Disponíveis",
      value: rooms.length,
      color: "#48C957",
      icon: (
        <svg
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth={2} />
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
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="10" strokeWidth={2} />
          <path d="M12 6v6l4 2" strokeWidth={2} strokeLinecap="round" />
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
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path d="M9 11l3 3L22 4" strokeWidth={2.5} strokeLinecap="round" />
          <circle cx="12" cy="15" r="8" strokeWidth={2} />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-10 px-4 relative overflow-hidden">
      {/* Abelhas animadas de fundo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {bees.map((bee, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: bee.top,
              left: bee.left,
              animationDelay: bee.delay,
              animationDuration: bee.duration,
            }}
          >
            <span className={`text-${bee.size} select-none`} style={{ opacity: bee.opacity }}>
              🐝
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          25% { transform: translate(15px, -10px) rotate(5deg); }
          50% { transform: translate(-10px, 10px) rotate(-8deg); }
          75% { transform: translate(10px, -5px) rotate(3deg); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 relative">
          <h1 className="text-6xl font-bold text-[#0C0C0C] mb-2 tracking-tight">
            Encontre o Espaço Perfeito
          </h1>
          <p className="text-[#48C957] text-lg font-medium mb-8">
            Reserve salas, recursos e itens para o seu próximo evento
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6">
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
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-[#FFB94F] focus:ring-2 focus:ring-[#b36608ff] focus:border-transparent outline-none shadow-lg bg-white"
              />
            </div>
          </div>
        </div>

        {/* Stats Hexagonais com efeitos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              onMouseEnter={() => setHoverCard(stat.id)}
              onMouseLeave={() => setHoverCard(null)}
              className="relative group flex justify-center"
            >
              <div
                className="relative w-48 h-52 hover:scale-105 transition-all duration-300"
                style={{
                  filter:
                    hoverCard === stat.id
                      ? "drop-shadow(0 20px 25px rgba(0,0,0,0.15))"
                      : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full absolute">
                  <defs>
                    <linearGradient
                      id={`grad-${stat.id}`}
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#FFE89F", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#FFD966", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                    fill={`url(#grad-${stat.id})`}
                    stroke="#e69500"
                    strokeWidth="3"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
                  <div
                    className="p-3 rounded-xl shadow-lg transform transition-all duration-300 mb-3"
                    style={{
                      backgroundColor: stat.color,
                      transform:
                        hoverCard === stat.id
                          ? "rotate(12deg) scale(1.15)"
                          : "rotate(0deg) scale(1)",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#8B4513] font-bold mb-1">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-[#0C0C0C]">
                      {stat.value}
                    </p>
                  </div>
                </div>

                {/* Brilho no hover */}
                {hoverCard === stat.id && (
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
          ))}
        </div>

        {/* Grid de Salas */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#FFB94F] mx-auto"></div>
            <p className="mt-4 text-[#8B4513] font-medium">
              A carregar salas...
            </p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-[#8B4513] text-lg font-medium">
              Nenhuma sala encontrada
            </p>
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
    </div>
  );
}