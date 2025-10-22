// /src/components/EditMovie.jsx
{/*Esse bloco de código é responsável por editar um filme existente no aplicativo.
Ele tem foco em atualizar um filme que já existe no banco de dados.
*/}
import { useState, useEffect } from 'react';
import { updateMovie } from '../services/api';
import StarRating from './StarRating';
import { useTranslation } from '../utils/translations';

export default function EditMovie({ movie, onMovieUpdated, language = 'en' }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    watched: false,
    rating: 0
  });

  const t = useTranslation(language);

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        year: movie.year,
        genre: movie.genre,
        watched: movie.watched,
        rating: movie.rating || 0
      });
    }
  }, [movie]);

  const handleWatchedChange = (checked) => {
    setFormData({
      ...formData, 
      watched: checked,
      rating: checked ? formData.rating : 0
    });
  };

  const handleSubmit = async () => {
    const movieData = {
      ...formData,
      year: parseInt(formData.year),
      rating: formData.watched ? formData.rating : null
    };
    
    await updateMovie(movie._id, movieData);
    alert(t.movieUpdated);
    if (onMovieUpdated) onMovieUpdated();
  };

  if (!movie) return <p className="empty-state">{t.noMovies}</p>;

  return (
    <div className="content-section">
      <h2 className="section-title">{t.editMovie}</h2>
      <div className="movie-form">
        <div className="form-group">
          <label>{t.title}</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t.year}</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>{t.genre}</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formData.watched}
              onChange={(e) => handleWatchedChange(e.target.checked)}
            />
            <span>{t.alreadyWatched}</span>
          </label>
        </div>
        
        {formData.watched && (
          <div className="form-group">
            <label>{t.rating}</label>
            <StarRating 
              rating={formData.rating} 
              onRatingChange={(rating) => setFormData({...formData, rating})}
              language={language}
            />
          </div>
        )}
        
        <button onClick={handleSubmit} className="btn-primary">{t.save}</button>
      </div>
    </div>
  );
}