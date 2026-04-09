import { useState, useEffect } from 'react';

import { getCats } from '../api/cats';

import type { TabType } from '../types/tabs';
import type { Cat } from '../types/cats';

export const useCats = (activeTab: TabType) => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cats.length === 0 && activeTab === 'all') {
            loadMore();
        }
    }, [activeTab]);

    async function loadMore (){
        if (loading || activeTab === 'favorites') return;

        setLoading(true);
        setError(null);

        try {
            const newCats = await getCats(page);
            setCats((prev) => [...prev, ...newCats]);
            setPage((prev) => prev + 1);
        } catch (err) {
            setError('Ошибка при загрузке котиков');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { cats, loading, error, loadMore };
};
