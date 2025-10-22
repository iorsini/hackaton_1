// /src/pages/api/movies/[id].js
{/*Esse bloco de código é uma API route do Next.js que permite a um usuário atualizar ou deletar um filme específico no banco de dados MongoDB, desde que o filme pertença a ele.
*/}
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import connectDB from '../../../../lib/mongodb'; // CAMINHO CORRETO!
import Movie from '../../../../models/Movie'; // CAMINHO CORRETO!

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const { id } = req.query;

  try {
    await connectDB();

    if (req.method === 'PUT') {
      // Só atualiza se o filme pertencer ao user
      const movie = await Movie.findOneAndUpdate(
        { _id: id, userId },
        req.body,
        { new: true }
      );
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      
      return res.status(200).json(movie);
    }

    if (req.method === 'DELETE') {
      // Só deleta se o filme pertencer ao user
      const movie = await Movie.findOneAndDelete({ _id: id, userId });
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }
      
      return res.status(200).json({ message: 'Movie deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Movie API error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}