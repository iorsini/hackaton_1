"use client";

import { useState, useEffect } from "react";

// ======================
// COMPONENTES INTERNOS
// ======================

function AdminHeader() {
  return (
    <div className="text-center mb-12 relative">
      {/* Ícone de colmeia em formato de camadas */}
      <div className="inline-block p-5 mb-6 transform hover:scale-110 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Camadas da colmeia */}
          {/* Topo */}
          <ellipse
            cx="50"
            cy="15"
            rx="20"
            ry="8"
            fill="#FFB94F"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Segunda camada */}
          <ellipse
            cx="50"
            cy="28"
            rx="28"
            ry="10"
            fill="#FFB94F"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Terceira camada (maior) */}
          <ellipse
            cx="50"
            cy="43"
            rx="35"
            ry="11"
            fill="#e5a740"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Quarta camada (maior ainda) */}
          <ellipse
            cx="50"
            cy="58"
            rx="38"
            ry="12"
            fill="#FFB94F"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Quinta camada */}
          <ellipse
            cx="50"
            cy="74"
            rx="32"
            ry="10"
            fill="#e5a740"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Base */}
          <ellipse
            cx="50"
            cy="87"
            rx="25"
            ry="9"
            fill="#FFB94F"
            stroke="#FFF"
            strokeWidth="2"
          />

          {/* Entrada da colmeia (buraquinho) */}
          <ellipse cx="50" cy="58" rx="6" ry="8" fill="#0C0C0C" />
        </svg>
      </div>

      <h1 className="text-6xl font-bold mr-4 text-[#0C0C0C] mb-2 tracking-tight">
        🐝 Painel da Colmeia
      </h1>
      <p className="text-[#48C957] text-lg font-medium ml-16">
        Gerencie reservas e recursos do seu coworking
      </p>

      {/* Padrão hexagonal de fundo */}
      <div className="absolute -z-10 inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern
            id="hexagons"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10 0 L15 5 L15 15 L10 20 L5 15 L5 5 Z"
              fill="none"
              stroke="#FFB94F"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>
    </div>
  );
}

function SummaryCards() {
  const [hoverCard, setHoverCard] = useState(null);

  const stats = [
    {
      id: "reservations",
      label: "Reservas Hoje",
      value: 5,
      color: "#ff8a4fff",
      icon: (
        <svg
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth={2} />
          <circle cx="12" cy="15" r="2" fill="white" />
        </svg>
      ),
    },
    {
      id: "rooms",
      label: "Salas Livres",
      value: 3,
      color: "#48C957",
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
    {
      id: "resources",
      label: "Recursos Disponíveis",
      value: 12,
      color: "#47c9e0ff",
      icon: (
        <svg
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <rect x="2" y="4" width="20" height="14" rx="2" strokeWidth={2} />
          <path d="M8 20h8" strokeWidth={2} strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {stats.map((stat) => (
        <div
          key={stat.id}
          onMouseEnter={() => setHoverCard(stat.id)}
          onMouseLeave={() => setHoverCard(null)}
          className="relative group flex justify-center"
        >
          {/* Hexágono individual (favo de mel) */}
          <div
            className="relative w-48 h-52 hover:scale-105 transition-all duration-300"
            style={{
              filter:
                hoverCard === stat.id
                  ? "drop-shadow(0 20px 25px rgba(0,0,0,0.15))"
                  : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
            }}
          >
            {/* Forma hexagonal */}
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
              {/* Hexágono */}
              <polygon
                points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                fill={`url(#grad-${stat.id})`}
                stroke="#b36608ff"
                strokeWidth="3"
              />
            </svg>

            {/* Conteúdo do hexágono */}
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
  );
}

function BookingSection() {
  const [expandedBooking, setExpandedBooking] = useState(null);

  const mockBookings = [
    {
      id: "1",
      user: "Rodolfo S.",
      room: "Sala A1",
      start: "10:00",
      end: "11:30",
      items: ["Chave A1", "Adaptador HDMI"],
      avatar: "👨‍💼",
    },
    {
      id: "2",
      user: "Isadora L.",
      room: "Sala B2",
      start: "14:00",
      end: "15:00",
      items: ["Controle Ar"],
      avatar: "👩‍💻",
    },
    {
      id: "3",
      user: "Felix M.",
      room: "Sala C3",
      start: "16:00",
      end: "17:30",
      items: [],
      avatar: "👨‍🔬",
    },
  ];

  // ícones para os itens das reservas — usamos os mesmos da seção de recursos
  const resourceIcons = {
    Projetor: "📽️",
    Whiteboard: "📋",
    Chave: "🔑",
    TV: "📺",
    "Wi-Fi Premium": "📡",
    "Adaptador HDMI": "🔌", // plugzinho pra representar o adaptador
    "Controle Ar": "🌬️", // vento pra simbolizar o ar-condicionado
  };

  const handleCancel = (id, user) => {
    if (confirm(`Cancelar reserva de ${user}?`)) {
      alert(`Reserva cancelada com sucesso! 🐝`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFB94F] p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0C0C0C] flex items-center">
          <span className="mr-3 text-3xl">📅</span>
          Reservas Ativas
        </h2>
        <div className="px-4 py-2 bg-[#48C957] text-white rounded-full text-sm font-bold shadow-md">
          {mockBookings.length} ativas
        </div>
      </div>

      <div className="space-y-4">
        {mockBookings.map((booking) => (
          <div
            key={booking.id}
            className="group relative bg-gradient-to-r from-[#F8F4E3] to-[#FFF8E7] p-5 rounded-xl border-2 border-[#FFB94F] hover:border-[#48C957] transition-all duration-300 transform hover:scale-[1.02]"
          >
            {/* Abelha decorativa no hover */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-2xl animate-bounce">🐝</span>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-4 flex-1">
                {/* Avatar */}
                <div className="text-4xl bg-[#48C957] rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                  {booking.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-lg text-[#0C0C0C]">
                      {booking.user}
                    </p>
                    <span className="px-3 py-1 bg-[#FFB94F] text-[#0C0C0C] rounded-full text-xs font-bold">
                      {booking.room}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth={2} />
                      <path
                        d="M12 6v6l4 2"
                        strokeWidth={2}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="font-medium">
                      {booking.start} – {booking.end}
                    </span>
                  </div>

                  {booking.items.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {booking.items.map((item, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white border-2 border-[#FFB94F] px-3 py-1 rounded-full text-[#0C0C0C] font-medium shadow-sm flex items-center gap-1"
                        >
                          {/* ícone do item, se tiver — senão, caímos no padrão 📦 */}
                          <span>{resourceIcons[item] || "📦"}</span>
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleCancel(booking.id, booking.user)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#FFB94F] to-[#e5a740] text-[#0C0C0C] rounded-full hover:from-[#e5a740] hover:to-[#FFB94F] transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceSection() {
  const [resources, setResources] = useState([
    {
      id: "A1",
      name: "Sala A1",
      available: true,
      resources: ["Projetor", "Whiteboard", "Chave"],
      icon: "🏢",
    },
    {
      id: "B2",
      name: "Sala B2",
      available: false,
      resources: ["TV", "Chave"],
      icon: "💼",
    },
    {
      id: "C3",
      name: "Sala C3",
      available: true,
      resources: ["Wi-Fi Premium"],
      icon: "🖥️",
    },
  ]);

  const toggleStatus = (id) => {
    setResources(
      resources.map((room) =>
        room.id === id ? { ...room, available: !room.available } : room
      )
    );
  };

  const resourceIcons = {
    Projetor: "📽️",
    Whiteboard: "📋",
    Chave: "🔑",
    TV: "📺",
    "Wi-Fi Premium": "📡",
    "Adaptador HDMI": "🔌",
    "Controle Ar": "🌬️",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFB94F] p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0C0C0C] flex items-center">
          <span className="mr-3 text-3xl">🧑‍💻</span>
          Gerenciar Recursos
        </h2>

        <button className="px-4 py-2 bg-gradient-to-r from-[#48C957] to-[#3ab049] text-white rounded-full font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
          + Novo Recurso
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((room) => (
          <div
            key={room.id}
            className="group bg-gradient-to-br from-[#F8F4E3] to-[#FFF8E7] p-5 rounded-xl border-2 border-[#FFB94F] hover:border-[#48C957] transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
          >
            {/* Padrão hexagonal decorativo */}
            <div className="absolute -right-4 -top-4 opacity-5 transform rotate-12">
              <svg className="w-24 h-24" viewBox="0 0 24 24">
                <path d="M12 2L15 5 L15 9 L12 12 L9 9 L9 5 Z" fill="#FFB94F" />
              </svg>
            </div>

            <div className="relative z-10">
              {/* Cabeçalho da sala */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{room.icon}</span>
                  <div>
                    <p className="font-bold text-lg text-[#0C0C0C]">
                      {room.name}
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${
                        room.available
                          ? "bg-[#48C957] text-white"
                          : "bg-[#FFB94F] text-[#0C0C0C]"
                      }`}
                    >
                      {room.available ? "✓ Livre" : "● Em uso"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de recursos */}
              <div className="flex flex-wrap gap-2 mb-4">
                {room.resources.map((res, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white border-2 border-[#FFB94F] px-3 py-1.5 rounded-full text-[#0C0C0C] font-medium shadow-sm flex items-center gap-1"
                  >
                    <span>{resourceIcons[res] || "📦"}</span>
                    {res}
                  </span>
                ))}
              </div>

              {/* Botão de ação */}
              <button
                onClick={() => toggleStatus(room.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${
                  room.available
                    ? "bg-gradient-to-r from-[#FFB94F] to-[#e5a740] text-[#0C0C0C] hover:from-[#e5a740] hover:to-[#FFB94F]"
                    : "bg-gradient-to-r from-[#48C957] to-[#3ab049] text-white hover:from-[#3ab049] hover:to-[#48C957]"
                }`}
              >
                {room.available ? (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Marcar Ocupada
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                      />
                    </svg>
                    Liberar Sala
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================
// PÁGINA PRINCIPAL
// ======================

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-10 px-4 relative overflow-hidden">
      {/* Abelhas animadas de fundo */}
      <div
        className="absolute top-20 left-10 animate-bounce"
        style={{ animationDelay: "0s", animationDuration: "3s" }}
      >
        <span className="text-4xl opacity-20">🐝</span>
      </div>
      <div
        className="absolute top-40 right-20 animate-bounce"
        style={{ animationDelay: "1s", animationDuration: "4s" }}
      >
        <span className="text-3xl opacity-20">🐝</span>
      </div>
      <div
        className="absolute bottom-40 left-1/4 animate-bounce"
        style={{ animationDelay: "2s", animationDuration: "5s" }}
      >
        <span className="text-3xl opacity-20">🐝</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AdminHeader />
        <SummaryCards />
        <div className="space-y-8">
          <BookingSection />
          <ResourceSection />
        </div>
      </div>

      {/* Rodapé decorativo */}
      <div className="text-center mt-12 pb-8">
        <p className="text-[#0C0C0C] opacity-50 text-sm">
          🍯 Feito com muito mel pela equipe Colmeia
        </p>
      </div>
    </div>
  );
}
