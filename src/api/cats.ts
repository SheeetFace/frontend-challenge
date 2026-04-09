import type { Cat } from "../types/cats";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL = import.meta.env.VITE_CAT_API_URL;

interface CatDTO {
  id: string;
  url: string;
  breeds?: any[];
  categories?: any[];
  width: number;
  height: number;
}

export const getCats = async (page: number = 0, limit: number = 18): Promise<Cat[]> => {
  const URL = `${BASE_URL}/images/search?size=med&mime_types=jpg&format=json&order=ASC&page=${page}&limit=${limit}&has_breeds=0`;

  const response = await fetch(URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка при загрузке котиков');
  }

  const data: CatDTO[] = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  return data.reduce<Cat[]>((acc, item) => {
    if (item.id && item.url) {
      acc.push({ id: item.id, url: item.url });
    }
    return acc;
  }, []);

};

