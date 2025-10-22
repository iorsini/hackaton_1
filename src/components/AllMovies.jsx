// /src/components/AllMovies.jsx
{/*Esse bloco de código é responsável por listar todos os filmes cadastrados, 
  além de permitir editar ou deletar cada um.
*/}
import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';
import { useTranslation } from '../utils/translations';

export default function AllMovies({ onEditClick, language = 'en' }) {
  const [movies, setMovies] = useState([]);
  const t = useTranslation(language);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const data = await getAllMovies();
    setMovies(data);
  };

  const handleDelete = async (id) => {
    if (confirm(t.deleteMovieConfirm)) {
      await deleteMovie(id);
      loadMovies();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">{t.allMovies}</h2>
      {movies.length === 0 && <p className="empty-state">{t.noMovies}</p>}
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie._id} className="movie-card">
            <div className="movie-poster">
              <div className="poster-placeholder">🎬</div>
            </div>
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-year">{movie.year}</p>
              <p className="movie-genre">{movie.genre}</p>
              <div className="movie-meta">
                <span className={`status-badge ${movie.watched ? 'watched' : 'unwatched'}`}>
                  {movie.watched ? `✓ ${t.watched}` : t.toWatch}
                </span>
                {movie.rating > 0 && (
                  <span className="rating-badge">★ {movie.rating}/10</span>
                )}
              </div>
              <div className="movie-actions">
                <button onClick={() => onEditClick(movie)} className="btn-secondary">
                  {t.edit}
                </button>
                <button onClick={() => handleDelete(movie._id)} className="btn-danger">
                  {t.delete}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}