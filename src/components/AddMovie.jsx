// /src/components/AddMovie.jsx
{/*Esse bloco de código define um componente React chamado AddMovie, 
  que é o formulário para adicionar um novo filme à base de dados.
*/}
import { useState } from 'react';
import { addMovie } from '../services/api';
import StarRating from './StarRating';
import { useTranslation } from '../utils/translations';

export default function AddMovie({ onMovieAdded, language = 'en' }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    watched: false,
    rating: 0
  });

  const t = useTranslation(language);

  const handleWatchedChange = (checked) => {
    setFormData({
      ...formData, 
      watched: checked,
      rating: checked ? formData.rating : 0
    });
  };

  const handleSubmit = async () => {
    if (formData.title && formData.year) {
      const movieData = {
        ...formData,
        year: parseInt(formData.year),
        rating: formData.watched ? formData.rating : null
      };
      
      await addMovie(movieData);
      alert(t.movieAdded);
      setFormData({ title: '', year: '', genre: '', watched: false, rating: 0 });
      if (onMovieAdded) onMovieAdded();
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">{t.addNewMovie}</h2>
      <div className="movie-form">
        <div className="form-group">
          <label>{t.title}</label>
          <input
            type="text"
            placeholder={t.title}
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>{t.year}</label>
            <input
              type="number"
              placeholder="2024"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>{t.genre}</label>
            <input
              type="text"
              placeholder={t.genre}
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
        
        <button onClick={handleSubmit} className="btn-primary">{t.addMovie}</button>
      </div>
    </div>
  );
}