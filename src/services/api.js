// CLIENTE

// Todas as salas
const getRooms = async () => {
  const response = await fetch('/api/salas');
  return response.json();
};



// Detalhes da sala (para recursos)
const getRoomDetails = async (roomId) => {
  const response = await fetch(`/api/salas/${roomId}`);
  return response.json();
};



// Datas disponíveis para uma sala
const getAvailableDates = async (roomId) => {
  const response = await fetch(`/api/salas/${roomId}/available-dates`);
  return response.json();
};



// Cria uma nova reserva para uma sala específica
const createBooking = async (roomId, bookingData) => {
  const response = await fetch(`/api/salas/${roomId}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  return response.json();
};


// ADMIN


const deleteBooking = async (id) => {
  const response = await fetch(`/api/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar reserva');
  }

}
// Salas reservadas
const getAllBookings = async () => {
  const response = await fetch('/api/bookings');
  return response.json();
}




// Sala específica reservada
const getRoomBookings = async (roomId) => {
  const response = await fetch(`/api/salas/${roomId}/booking`);
  return response.json();
};
const createRoom = async (roomData) => {
  const response = await fetch('/api/salas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(roomData),
  });
  return response.json();
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