import { CatCard } from '../CatCard/CatCard';

import type { Cat } from '../../types/cats';

import styles from './CatGrid.module.css';

interface CatGridProps {
  cats: Cat[];
  isLoading: boolean;
}

export const CatGrid = ({ cats, isLoading }: CatGridProps) => {

  if (cats.length === 0 && !isLoading ) {
    return <span className={styles.empty}>Котиков пока нет...</span>;
  }

  return (
    <div className={styles.grid}>
      {cats.map((cat) => (
        <CatCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};
