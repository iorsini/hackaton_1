// /src/components/StarRating.jsx
{/*Esse bloco de código é o componente de estrelas de avaliação.
  Ele permite que o usuário avalie um filme clicando em 1 a 10 estrelas.
*/}
import { useState } from 'react';
import { useTranslation } from '../utils/translations';

export default function StarRating({ rating, onRatingChange, language = 'en' }) {
  const [hover, setHover] = useState(0);
  const t = useTranslation(language);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={star <= (hover || rating) ? 'star filled' : 'star'}
        >
          ★
        </span>
      ))}
      <span className="rating-display">
        {rating ? `${rating}/10` : t.selectRating}
      </span>
    </div>
  );
}