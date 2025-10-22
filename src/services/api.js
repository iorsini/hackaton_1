// /src/services/api.js
{/*Esse bloco de código é um módulo de API client em JavaScript para interagir com a rota /api/movies da app. 
  Ele define funções para realizar as operações CRUD (Create, Read, Update, Delete) de filmes.
*/}
const API_URL = '/api/movies';

export const getAllMovies = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const addMovie = async (movieData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  return response.json();
};

export const updateMovie = async (id, movieData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movieData)
  });
  return response.json();
};

export const deleteMovie = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
};