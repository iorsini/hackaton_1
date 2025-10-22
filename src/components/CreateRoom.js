"use client"
import React, { useState } from 'react';
import { createRoom } from '../services/api';

const CreateRoom = () => {
	const [form, setForm] = useState({
		name: '',
		description: '',
		capacity: 1,
		resources: '',
		location: '',
	});
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const roomData = {
			...form,
			resources: form.resources.split(',').map(r => r.trim()),
		};
		try {
			await createRoom(roomData);
			setMessage('Sala criada com sucesso!');
			setForm({ name: '', description: '', capacity: 1, resources: '', location: '' });
		} catch {
			setMessage('Erro ao criar sala.');
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: '1rem auto', padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
			<h2 style={{ marginBottom: 12 }}>Criar Sala</h2>
			<input name="name" value={form.name} onChange={handleChange} placeholder="Nome" required style={{ width: '100%', marginBottom: 8 }} />
			<input name="description" value={form.description} onChange={handleChange} placeholder="Descrição" required style={{ width: '100%', marginBottom: 8 }} />
			<input name="capacity" type="number" min={1} value={form.capacity} onChange={handleChange} placeholder="Capacidade" required style={{ width: '100%', marginBottom: 8 }} />
			<input name="resources" value={form.resources} onChange={handleChange} placeholder="Recursos (separados por vírgula)" style={{ width: '100%', marginBottom: 8 }} />
			<input name="location" value={form.location} onChange={handleChange} placeholder="Localização" style={{ width: '100%', marginBottom: 8 }} />
			<button type="submit" style={{ width: '100%', padding: 8, background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4 }}>Criar</button>
			{message && <div style={{ marginTop: 12 }}>{message}</div>}
		</form>
	);
};

export default CreateRoom;
