import { createContext, useContext, useState, useEffect } from 'react';

import type { Cat } from '../types/cats';
import type { ReactNode } from 'react';

interface CatContextType {
    favorites: Cat[];
    toggleFavorite: (cat: Cat) => void;
    isFavorite: (id: string) => boolean;
}

const CatContext = createContext<CatContextType | undefined>(undefined);

const getInitialFavorites = (): Cat[] => {
    const saved = localStorage.getItem('favorite_cats');
    try {
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

export const CatProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<Cat[]>(getInitialFavorites);

    useEffect(() => {
        localStorage.setItem('favorite_cats', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (cat: Cat) => {
        setFavorites((prev) => {
            const isAlreadyFav = prev.some(item => item.id === cat.id);

            if (isAlreadyFav) return prev.filter(item => item.id !== cat.id);
            else return [...prev, cat];
        });
    };

    const isFavorite = (id: string) => favorites.some(cat => cat.id === id);

    return (
        <CatContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
            {children}
        </CatContext.Provider>
    );
};

export const useCatsContext = () => {
    const context = useContext(CatContext);
    if (!context) throw new Error('useCatsContext должен использоваться с CatProvider');
    return context;
};
