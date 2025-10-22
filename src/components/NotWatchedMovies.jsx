// /src/components/NotWatchedMovies.jsx
{/*Esse bloco de código é o componente que mostra apenas os filmes ainda não assistidos 
  (uma espécie de “lista de pendentes”
*/}
import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';
import { useTranslation } from '../utils/translations';

export default function NotWatchedMovies({ onEditClick, language = 'en' }) {
  const [movies, setMovies] = useState([]);
  const t = useTranslation(language);

  useEffect(() => {
    loadNotWatchedMovies();
  }, []);

  const loadNotWatchedMovies = async () => {
    const data = await getAllMovies();
    const unwatched = data.filter(movie => movie.watched === false);
    setMovies(unwatched);
  };

  const handleDelete = async (id) => {
    if (confirm(t.deleteMovieConfirm)) {
      await deleteMovie(id);
      loadNotWatchedMovies();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">{t.toWatch}</h2>
      {movies.length === 0 && <p className="empty-state">{t.noToWatch}</p>}
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