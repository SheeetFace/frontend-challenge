import type { Cat } from "../types/cats";

const API_KEY = import.meta.env.VITE_CAT_API_KEY;
const BASE_URL = import.meta.env.VITE_CAT_API_URL;

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

  const data = await response.json();
  return data;
};

