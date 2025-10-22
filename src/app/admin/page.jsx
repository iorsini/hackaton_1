"use client";

import { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";

// Funções API (substitua pelos seus imports reais)
const getAllBookings = async () => {
  const response = await fetch('/api/bookings');
  return response.json();
};

const getRooms = async () => {
  const response = await fetch('/api/salas');
  return response.json();
};

// ======================
// COMPONENTES INTERNOS
// ======================

function AdminHeader() {
  return (
    <div className="text-center mb-12 relative">
      <div className="inline-block p-5 mb-6 transform hover:scale-110 transition-transform duration-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-40 w-40"
          viewBox="0 0 100 100"
          fill="none"
        >
          <ellipse cx="50" cy="15" rx="20" ry="8" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="28" rx="28" ry="10" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="43" rx="35" ry="11" fill="#e5a740" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="58" rx="38" ry="12" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="74" rx="32" ry="10" fill="#e5a740" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="87" rx="25" ry="9" fill="#FFB94F" stroke="#FFF" strokeWidth="2"/>
          <ellipse cx="50" cy="58" rx="6" ry="8" fill="#0C0C0C"/>
        </svg>
      </div>

      <h1 className="text-6xl font-bold mr-4 text-[#0C0C0C] mb-2 tracking-tight">
        🐝 Painel da Colmeia
      </h1>
      <p className="text-[#48C957] text-lg font-medium ml-16">
        Gerencie reservas e recursos do seu coworking
      </p>

      <div className="absolute -z-10 inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="hexagons" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L15 5 L15 15 L10 20 L5 15 L5 5 Z" fill="none" stroke="#FFB94F" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#hexagons)" />
        </svg>
      </div>
    </div>
  );
}

function SummaryCards({ reservationsCount, roomsCount }) {
  const [hoverCard, setHoverCard] = useState(null);

  const stats = [
    {
      id: "reservations",
      label: "Reservas Ativas",
      value: reservationsCount,
      color: "#ff8a4fff",
      icon: (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
          <path d="M16 2v4M8 2v4M3 10h18" strokeWidth={2} />
          <circle cx="12" cy="15" r="2" fill="white" />
        </svg>
      ),
    },
    {
      id: "rooms",
      label: "Salas Cadastradas",
      value: roomsCount,
      color: "#48C957",
      icon: (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={2} />
          <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeWidth={2} />
        </svg>
      ),
    },
    {
      id: "system",
      label: "Sistema",
      value: "Ativo",
      color: "#47c9e0ff",
      icon: (
        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 11l3 3L22 4" strokeWidth={2.5} strokeLinecap="round" />
          <circle cx="12" cy="15" r="8" strokeWidth={2} />
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
          <div
            className="relative w-48 h-52 hover:scale-105 transition-all duration-300"
            style={{
              filter: hoverCard === stat.id
                ? "drop-shadow(0 20px 25px rgba(0,0,0,0.15))"
                : "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full absolute">
              <defs>
                <linearGradient id={`grad-${stat.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: "#FFE89F", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#FFD966", stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <polygon
                points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
                fill={`url(#grad-${stat.id})`}
                stroke="#b36608ff"
                strokeWidth="3"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6">
              <div
                className="p-3 rounded-xl shadow-lg transform transition-all duration-300 mb-3"
                style={{
                  backgroundColor: stat.color,
                  transform: hoverCard === stat.id ? "rotate(12deg) scale(1.15)" : "rotate(0deg) scale(1)",
                }}
              >
                {stat.icon}
              </div>
              <div className="text-center">
                <p className="text-xs text-[#8B4513] font-bold mb-1">{stat.label}</p>
                <p className="text-4xl font-bold text-[#0C0C0C]">{stat.value}</p>
              </div>
            </div>

            {hoverCard === stat.id && (
              <div className="absolute inset-0 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5" fill="rgba(255, 255, 255, 0.2)"/>
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
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allBookings, allRooms] = await Promise.all([
          getAllBookings(),
          getRooms()
        ]);
        setBookings(allBookings);
        setRooms(allRooms);
      } catch (err) {
        setBookings([]);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const resourceIcons = {
    Projetor: "📽️",
    Whiteboard: "📋",
    "Quadro Branco": "📋",
    Chave: "🔑",
    TV: "📺",
    WiFi: "📡",
    "Wi-Fi Premium": "📡",
    "Adaptador HDMI": "🔌",
    "Controle Ar": "🌬️",
    Videoconferência: "💻",
    "Sistema de Som": "🔊",
    Café: "☕",
    Monitor: "🖥️",
    Palco: "🎭",
    Microfones: "🎤",
    "Post-its": "📝",
    "Mesas Modulares": "🪑",
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
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-500">Carregando reservas...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500">Nenhuma reserva ativa no momento</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const roomObj = rooms.find(r => r._id === booking.room);
            const roomName = roomObj ? roomObj.name : booking.room;
            
            return (
              <div
                key={booking._id}
                className="group relative bg-gradient-to-r from-[#F8F4E3] to-[#FFF8E7] p-5 rounded-xl border-2 border-[#FFB94F] hover:border-[#48C957] transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-2xl animate-bounce">🐝</span>
                </div>

                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-4xl bg-[#48C957] rounded-full w-14 h-14 flex items-center justify-center shadow-md">
                      {booking.userName ? booking.userName[0].toUpperCase() : "👤"}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-lg text-[#0C0C0C]">
                          {booking.userName || "Usuário"}
                        </p>
                        <span className="px-3 py-1 bg-[#FFB94F] text-[#0C0C0C] rounded-full text-xs font-bold">
                          {roomName}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                            <path d="M16 2v4M8 2v4M3 10h18" strokeWidth={2} />
                          </svg>
                          <span className="font-medium">
                            {new Date(booking.date).toLocaleDateString('pt-PT')}
                          </span>
                        </div>
                      </div>

                      {booking.numberOfPeople && (
                        <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                          <span className="font-medium">{booking.numberOfPeople} pessoa{booking.numberOfPeople > 1 ? 's' : ''}</span>
                        </div>
                      )}

                      {booking.selectedResources && booking.selectedResources.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-600 mb-2 font-semibold">Recursos solicitados:</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.selectedResources.map((resource, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 text-xs bg-white border-2 border-[#FFB94F] px-3 py-1 rounded-full text-[#0C0C0C] font-medium shadow-sm"
                              >
                                <span>{resourceIcons[resource] || "📦"}</span>
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {booking.purpose && (
                        <div className="mt-3 text-sm text-gray-600">
                          <span className="font-semibold">Finalidade:</span> {booking.purpose}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleCancel(booking._id, booking.userName)}
                    className="px-5 py-2.5 bg-gradient-to-r from-[#FFB94F] to-[#e5a740] text-[#0C0C0C] rounded-full hover:from-[#e5a740] hover:to-[#FFB94F] transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancelar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RoomStatusSection() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    async function fetchData() {
      try {
        const [allRooms, allBookings] = await Promise.all([
          getRooms(),
          getAllBookings()
        ]);
        setRooms(allRooms);
        setBookings(allBookings);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const resourceIcons = {
    Projetor: "📽️",
    "Quadro Branco": "📋",
    Whiteboard: "📋",
    WiFi: "📡",
    Videoconferência: "💻",
    "Sistema de Som": "🔊",
    Café: "☕",
    Monitor: "🖥️",
    Palco: "🎭",
    Microfones: "🎤",
    "Post-its": "📝",
    "Mesas Modulares": "🪑",
  };

  const getRoomIcon = (room) => {
    if (room.location?.toLowerCase().includes("auditório") || 
        room.name?.toLowerCase().includes("auditório")) return "🎭";
    if (room.location?.toLowerCase().includes("conferência") || 
        room.name?.toLowerCase().includes("conferência")) return "💼";
    if (room.location?.toLowerCase().includes("brainstorm") || 
        room.name?.toLowerCase().includes("brainstorm")) return "💡";
    if (room.name?.toLowerCase().includes("privada")) return "🔒";
    return "🏢";
  };

  const isRoomOccupiedOnDate = (roomId, date) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return bookings.find(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return booking.room === roomId && bookingDate.getTime() === checkDate.getTime();
    });
  };

  const getRoomStatusOnDate = (roomId, date) => {
    const booking = isRoomOccupiedOnDate(roomId, date);
    if (!booking) return { status: "free", label: "✓ Livre", color: "bg-[#48C957]" };
    
    return {
      status: "occupied",
      label: "● Ocupada",
      color: "bg-[#FFB94F]",
      booking: booking,
    };
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  const hasBookingOnDay = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    checkDate.setHours(0, 0, 0, 0);

    return bookings.some(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === checkDate.getTime();
    });
  };

  const isSelectedDay = (day) => {
    const checkDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return selectedDate.toDateString() === checkDate.toDateString();
  };

  const selectDay = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setSelectedDate(newDate);
    setShowCalendar(false);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-[#FFB94F] p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#0C0C0C] flex items-center">
          <span className="mr-3 text-3xl">🏢</span>
          Controle de Recursos
        </h2>
      </div>

      <div className="bg-gradient-to-r from-[#FFF8E7] to-[#F8F4E3] rounded-xl p-4 mb-6 border border-[#FFB94F]">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📅</div>
            <div>
              <p className="text-xs text-gray-600 font-medium">Visualizando</p>
              <p className="text-lg font-bold text-[#0C0C0C]">
                {selectedDate.toLocaleDateString('pt-PT', { 
                  day: 'numeric', 
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FFB94F] to-[#e5a740] text-[#0C0C0C] rounded-full hover:from-[#e5a740] hover:to-[#FFB94F] transition-all duration-300 font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Calendar size={16} />
            Alterar Data
          </button>
        </div>

        {showCalendar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#0C0C0C]">Selecionar Data</h3>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-[#FFF8E7] rounded-full transition"
                >
                  <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <h4 className="text-lg font-bold text-[#0C0C0C]">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h4>
                
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-[#FFF8E7] rounded-full transition"
                >
                  <svg className="w-6 h-6 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs font-bold text-[#8B4513] py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {[...Array(startingDayOfWeek)].map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square"></div>
                ))}
                
                {[...Array(daysInMonth)].map((_, i) => {
                  const day = i + 1;
                  const hasBooking = hasBookingOnDay(day);
                  const isSelected = isSelectedDay(day);
                  const isToday = new Date().getDate() === day && 
                                  new Date().getMonth() === currentMonth.getMonth() &&
                                  new Date().getFullYear() === currentMonth.getFullYear();

                  return (
                    <button
                      key={day}
                      onClick={() => selectDay(day)}
                      className={`aspect-square flex items-center justify-center rounded-lg text-sm font-semibold transition-all cursor-pointer relative
                        ${isSelected ? 'bg-[#48C957] text-white scale-110 shadow-lg' : ''}
                        ${!isSelected && hasBooking ? 'bg-[#FFB94F] text-[#0C0C0C] hover:bg-[#e5a740]' : ''}
                        ${!isSelected && !hasBooking ? 'bg-[#F8F4E3] text-gray-700 hover:bg-[#FFE0A3]' : ''}
                        ${isToday && !isSelected ? 'ring-2 ring-[#48C957]' : ''}
                      `}
                    >
                      {day}
                      {hasBooking && !isSelected && (
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0C0C0C] rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 mt-6 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#FFB94F]"></div>
                  <span>Com reservas</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-[#F8F4E3]"></div>
                  <span>Sem reservas</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#FFB94F] mx-auto"></div>
        </div>
      ) : rooms.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-500">Nenhuma sala cadastrada</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => {
            const roomStatus = getRoomStatusOnDate(room._id, selectedDate);
            
            return (
              <div
                key={room._id}
                className="group bg-gradient-to-br from-[#F8F4E3] to-[#FFF8E7] p-5 rounded-xl border-2 border-[#FFB94F] hover:border-[#48C957] transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 opacity-5 transform rotate-12">
                  <svg className="w-24 h-24" viewBox="0 0 24 24">
                    <path d="M12 2L15 5 L15 9 L12 12 L9 9 L9 5 Z" fill="#FFB94F" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl">{getRoomIcon(room)}</span>
                      <div>
                        <p className="font-bold text-lg text-[#0C0C0C]">
                          {room.name}
                        </p>
                        {room.location && (
                          <p className="text-xs text-gray-600">{room.location}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span
                      className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${roomStatus.color} text-white shadow-md`}
                    >
                      {roomStatus.label}
                    </span>
                  </div>

                  {roomStatus.status === "occupied" && roomStatus.booking && (
                    <div className="bg-white bg-opacity-60 rounded-lg p-3 mb-4 border border-[#FFB94F]">
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Reservado por:</span> {roomStatus.booking.userName}
                      </p>
                      <p className="text-sm text-gray-700">
                        <span className="font-semibold">Pessoas:</span> {roomStatus.booking.numberOfPeople}
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Capacidade:</span> {room.capacity} pessoas
                    </p>
                  </div>

                  {room.resources && room.resources.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-600 font-semibold mb-2">Recursos:</p>
                      <div className="flex flex-wrap gap-2">
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
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ======================
// PÁGINA PRINCIPAL
// ======================

export default function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [allBookings, allRooms] = await Promise.all([
          getAllBookings(),
          getRooms()
        ]);
        setBookings(allBookings);
        setRooms(allRooms);
      } catch (err) {
        setBookings([]);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F4E3] via-[#FFF8E7] to-[#F8F4E3] py-10 px-4 relative overflow-hidden">
      {/* Abelhas animadas de fundo */}
      <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>
        <span className="text-4xl opacity-20">🐝</span>
      </div>
      <div className="absolute top-40 right-20 animate-bounce" style={{ animationDelay: "1s", animationDuration: "4s" }}>
        <span className="text-3xl opacity-20">🐝</span>
      </div>
      <div className="absolute bottom-40 left-1/4 animate-bounce" style={{ animationDelay: "2s", animationDuration: "5s" }}>
        <span className="text-3xl opacity-20">🐝</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <AdminHeader />
        <SummaryCards reservationsCount={bookings.length} roomsCount={rooms.length} />
        <div className="space-y-8">
          <BookingSection />
          <RoomStatusSection />
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