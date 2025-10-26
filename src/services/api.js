// CLIENTE - Serviços da API

// Todas as salas
const getRooms = async () => {
  try {
    const response = await fetch('/api/salas', {
      cache: 'no-store', // 🔥 Desabilita cache
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return [];
  }
};

// Detalhes da sala (para recursos)
const getRoomDetails = async (roomId) => {
  try {
    const response = await fetch(`/api/salas/${roomId}`, {
      cache: 'no-store',
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes da sala:', error);
    return null;
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
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Erro ao criar reserva');
    }
    
    return result;
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    throw error;
  }
};

// ADMIN

// 🔥 CORREÇÃO: Todas as reservas com força no cache
const getAllBookings = async () => {
  try {
    // Adiciona timestamp para evitar cache
    const timestamp = new Date().getTime();
    const response = await fetch(`/api/bookings?_=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    
    if (!response.ok) {
      console.error('Erro na resposta:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    console.log('📊 Reservas recebidas:', data.length);
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('Formato inesperado:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Erro ao buscar reservas:', error);
    return [];
  }
};

// 🔥 CORREÇÃO: Deletar reserva com revalidação
const deleteBooking = async (id) => {
  try {
    console.log('🗑️ Deletando reserva:', id);
    
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao deletar reserva');
    }
    
    const result = await response.json();
    console.log('✅ Reserva deletada:', result);
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao deletar reserva:', error);
    throw error;
  }
};

// Reservas de uma sala específica
const getRoomBookings = async (roomId) => {
  try {
    const response = await fetch(`/api/salas/${roomId}/bookings`, {
      cache: 'no-store',
    });
    const data = await response.json();
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
    
    if (!response.ok) {
      throw new Error('Erro ao criar sala');
    }
    
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
  createBooking,
  createRoom,
  deleteBooking
};