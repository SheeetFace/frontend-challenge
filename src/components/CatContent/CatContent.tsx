import { useCats } from '../../hooks/useCats';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import { CatGrid } from '../CatGrid/CatGrid';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import styles from './CatContent.module.css';

import type { Cat } from '../../types/cats';
import type { TabType } from '../../types/tabs';

interface CatContentProps {
  activeTab: TabType;
}

export const CatContent = ({ activeTab }: CatContentProps) => {
  const { cats, loading, loadMore, error } = useCats(activeTab);

  const favoriteCats: Cat[] = [];
  const isFavorites = activeTab === 'favorites';

  const observerRef = useIntersectionObserver(loadMore, (!loading && !isFavorites));

  if (error && !isFavorites) {
    return <ErrorMessage message={error} onRetry={loadMore} />;
  }

  return (
    <div>
      <CatGrid
        cats={isFavorites ? favoriteCats : cats}
        isLoading={loading} 
      />

      {!isFavorites && (
        <div ref={observerRef} className={styles.observerTrigger}>
          {loading && <p className={styles.loader}>... загружаем еще котиков ...</p>}
        </div>
      )}
    </div>
  );
};
