import { useCatsContext } from '../../context/CatContext';

import { useCats } from '../../hooks/useCats';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import { CatGrid } from '../CatGrid/CatGrid';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { StatusState } from '../StatusState/StatusState';

import styles from './CatContent.module.css';

import type { TabType } from '../../types/tabs';

interface CatContentProps {
  activeTab: TabType;
}

export const CatContent = ({ activeTab }: CatContentProps) => {
  const { cats, loading, loadMore, error } = useCats(activeTab);

  const { favorites } = useCatsContext();

  const isFavorites = activeTab === 'favorites';
  const canLoadMore = !loading && !isFavorites && !error;
  const isFirstLoad = loading && cats.length === 0 && !isFavorites;
  const isError = error && !isFavorites && cats.length === 0;

  const observerRef = useIntersectionObserver(loadMore, canLoadMore);

  if (isFirstLoad) return <StatusState message="Ищем котиков..." icon='🐾' />
  
  if (isError) return <ErrorMessage message={error} onRetry={loadMore} />;
  
  return (
    <div>
      {isFavorites ? (
        <CatGrid key="favorites-grid" cats={favorites} isLoading={false} />
      ) : (
        <div key="all-cats-wrapper">
          <CatGrid cats={cats} isLoading={loading} />

          <div ref={observerRef} className={styles.observerTrigger}>
            {loading && <p className={styles.loader}>... загружаем еще котиков ...</p>}
          </div>

          {error && cats.length > 0 && (
            <ErrorMessage message="Не удалось подгрузить еще котиков" onRetry={loadMore} />
          )}
        </div>
      )}
    </div>
  );
};
