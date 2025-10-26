// CLIENTE - Serviços da API com FORCE REFRESH

// 🔥 Helper para gerar URL com cache-busting
const getCacheBustingUrl = (url) => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}_t=${Date.now()}&_r=${Math.random()}`;
};

// 🔥 Headers anti-cache padrão
const antiCacheHeaders = {
  'Cache-Control': 'no-cache, no-store, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

// Todas as salas
const getRooms = async () => {
  try {
    const response = await fetch(getCacheBustingUrl('/api/salas'), {
      cache: 'no-store',
      headers: antiCacheHeaders,
    });
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Erro ao buscar salas:', error);
    return [];
  }
};

// Detalhes da sala
const getRoomDetails = async (roomId) => {
  try {
    const response = await fetch(getCacheBustingUrl(`/api/salas/${roomId}`), {
      cache: 'no-store',
      headers: antiCacheHeaders,
    });
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes da sala:', error);
    return null;
  }
};

// Criar reserva
const createBooking = async (roomId, bookingData) => {
  try {
    const response = await fetch(`/api/salas/${roomId}/booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...antiCacheHeaders,
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

// ADMIN - Todas as reservas (COM FORÇA TOTAL ANTI-CACHE)
const getAllBookings = async () => {
  try {
    console.log('🔄 Buscando reservas do servidor...');
    
    // 🔥 URL com múltiplos parâmetros anti-cache
    const url = getCacheBustingUrl('/api/bookings');
    
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        ...antiCacheHeaders,
        // 🔥 Header adicional para forçar resposta fresca
        'X-Force-Refresh': 'true',
      },
      // 🔥 Força requisição fresca no browser
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error('❌ Erro na resposta:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    console.log('📊 Reservas recebidas:', data.length);
    console.log('🕐 Timestamp da resposta:', response.headers.get('X-Timestamp'));
    
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else {
      console.warn('⚠️ Formato inesperado:', data);
      return [];
    }
  } catch (error) {
    console.error('❌ Erro ao buscar reservas:', error);
    return [];
  }
};

// Deletar reserva (COM REVALIDAÇÃO FORÇADA)
const deleteBooking = async (id) => {
  try {
    console.log('🗑️ Deletando reserva:', id);
    
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE',
      headers: {
        ...antiCacheHeaders,
        'X-Force-Refresh': 'true',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.erro || 'Erro ao deletar reserva');
    }
    
    const result = await response.json();
    console.log('✅ Reserva deletada:', result);
    
    // 🔥 CRITICAL: Aguardar um momento para garantir propagação no DB
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return true;
  } catch (error) {
    console.error('❌ Erro ao deletar reserva:', error);
    throw error;
  }
};

// Reservas de uma sala específica
const getRoomBookings = async (roomId) => {
  try {
    const response = await fetch(getCacheBustingUrl(`/api/salas/${roomId}/bookings`), {
      cache: 'no-store',
      headers: antiCacheHeaders,
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
        ...antiCacheHeaders,
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