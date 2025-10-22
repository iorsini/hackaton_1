// /src/components/WatchedMovies.jsx
{/*Esse bloco de código é o que mostra a lista de filmes que o usuário já assistiu
*/}
import { useState, useEffect } from 'react';
import { getAllMovies, deleteMovie } from '../services/api';
import { useTranslation } from '../utils/translations';

export default function WatchedMovies({ onEditClick, language = 'en' }) {
  const [movies, setMovies] = useState([]);
  const t = useTranslation(language);

  useEffect(() => {
    loadWatchedMovies();
  }, []);

  const loadWatchedMovies = async () => {
    const data = await getAllMovies();
    const watched = data.filter(movie => movie.watched === true);
    setMovies(watched);
  };

  const handleDelete = async (id) => {
    if (confirm(t.deleteMovieConfirm)) {
      await deleteMovie(id);
      loadWatchedMovies();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">{t.watched}</h2>
      {movies.length === 0 && <p className="empty-state">{t.noWatchedMovies}</p>}
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