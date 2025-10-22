"use client"
import React, {useState, useEffect} from 'react';
import {getRooms} from '../../services/api';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await getRooms();
      setRooms(data);
    };
    fetchRooms();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Salas</h1>
      {rooms.length === 0 ? (
        <div>Nenhuma sala encontrada.</div>
      ) : (
        rooms.map((room) => (
          <div key={room._id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 12, marginBottom: 16 }}>
            <h2 style={{ margin: 0 }}>{room.name}</h2>
            <p><strong>Descrição:</strong> {room.description}</p>
            <p><strong>Capacidade:</strong> {room.capacity} pessoas</p>
            <p><strong>Recursos:</strong> {Array.isArray(room.resources) ? room.resources.join(', ') : room.resources}</p>
            <p><strong>Localização:</strong> {room.location}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Rooms;