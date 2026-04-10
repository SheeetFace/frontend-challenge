import { useState } from 'react';

import { useCatsContext } from '../../context/CatContext';

import { HeartFilled } from '../Icons/HeartFilled';
import { HeartOutline } from '../Icons/HeartOutline';

import styles from './CatCard.module.css';

import type { Cat } from '../../types/cats';

interface CatCardProps {
  cat: Cat;
}

export const CatCard = ({ cat }: CatCardProps) => {
  const { toggleFavorite, isFavorite } = useCatsContext();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const active = isFavorite(cat.id);

  const handleClick = (cat: Cat) => toggleFavorite(cat);

  return (
    <article
      className={`
        ${styles.card} 
        ${!isImageLoaded ? styles.pulsing : ''}
        ${active ? styles.isFavorite : ''}
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
        aria-label={active ? "Убрать из любимых" : "Добавить в любимые"}
        onClick={() => handleClick(cat)}
      >

        <div className={styles.heartOutline}>
          <HeartOutline />
        </div>
        <div className={styles.heartFilled}>
          <HeartFilled />
        </div>

      </button>
      
    </article>
  );
};