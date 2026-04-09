import { HeartFilled } from '../Icons/HeartFilled';
import { HeartOutline } from '../Icons/HeartOutline';

import styles from './CatCard.module.css';

import type { Cat } from '../../types/cats';
import { useState } from 'react';

interface CatCardProps {
  cat: Cat;
  isFavorite?: boolean;
}

export const CatCard = ({ cat, isFavorite = false }: CatCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <article
      className={`
        ${styles.card} 
        ${!isImageLoaded ? styles.pulsing : ''} 
        ${isFavorite ? styles.isFavorite : ''}
      `}
    >
      <img
        src={cat.url}
        alt={`Котик ${cat.id}`}
        className={styles.image}
        loading="lazy"
        onLoad={() => setIsImageLoaded(true)}
      />

      <div className={styles.gradientOverlay} />

      <button
        className={styles.favoriteButton}
        type="button"
        aria-label={isFavorite ? "Убрать из любимых" : "Добавить в любимые"}
        onClick={() => console.log(`Котик ${cat.id}`)}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutline />}
      </button>
    </article>
  );
};
