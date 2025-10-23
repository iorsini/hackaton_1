// CLIENTE

// Todas as salas
const getRooms = async () => {
  try {
    const response = await fetch('/api/salas');
    const data = await response.json();
    // Garantir que sempre retorna um array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return [];
  }
};

// Detalhes da sala (para recursos)
const getRoomDetails = async (roomId) => {
  try {
    const response = await fetch(`/api/salas/${roomId}`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes da sala:', error);
    return null;
  }
};

// Datas disponíveis para uma sala
const getAvailableDates = async (roomId) => {
  try {
    const response = await fetch(`/api/salas/${roomId}/available-dates`);
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar datas disponíveis:', error);
    return { unavailableDates: [] };
  }
};

// Cria uma nova reserva para uma sala específica
const createBooking = async (roomId, bookingData) => {
  try {
    const response = await fetch(`/api/salas/${roomId}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    throw error;
  }
};

// ADMIN

// Deletar reserva
const deleteBooking = async (id) => {
  try {
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao deletar reserva');
    }
    return true;
  } catch (error) {
    console.error('Erro ao deletar reserva:', error);
    throw error;
  }
};

// Todas as reservas (CORRIGIDO)
const getAllBookings = async () => {
  try {
    const response = await fetch('/api/bookings');
    const data = await response.json();
    
    // 🔥 CORREÇÃO: Garantir que sempre retorna um array
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('Formato inesperado de resposta:', data);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    return []; // Retorna array vazio em caso de erro
  }
};

// Reservas de uma sala específica
const getRoomBookings = async (roomId) => {
  try {
    const response = await fetch(`/api/salas/${roomId}/bookings`);
    const data = await response.json();
    // Garantir que sempre retorna um array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao buscar reservas da sala:', error);
    return [];
  }
};

// Criar nova sala
const createRoom = async (roomData) => {
  try {
    const response = await fetch('/api/salas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roomData),
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar sala:', error);
    throw error;
  }
};

export {
  getRooms,
  getRoomDetails,
  getAllBookings,
  getRoomBookings,
  getAvailableDates,
  createBooking,
  createRoom,
  deleteBooking
};