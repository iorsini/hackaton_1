// /src/pages/api/movies/index.js
{/*Esse bloco de código é uma API route do Next.js que permite a um usuário listar ou criar filmes 
  no banco de dados MongoDB, garantindo que cada usuário só veja ou crie filmes associados a ele.
*/}
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../../lib/mongodb';
import Movie from '../../../../models/Movie';

export default async function handler(req, res) {
  // Verificar autenticação
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Buscar APENAS filmes do user logado
      const movies = await Movie.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json(movies);
    }

    if (req.method === 'POST') {
      const movieData = { ...req.body, userId }; // Adiciona userId
      const movie = await Movie.create(movieData);
      return res.status(201).json(movie);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Movies API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}