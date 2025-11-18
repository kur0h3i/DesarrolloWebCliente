import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'tvmaze-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    const loadFavorites = () => {
      try {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setFavorites(parsed);
        }
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error al guardar favoritos:', error);
    }
  }, [favorites]);

  const toggleFavorite = (serie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === serie.id);
      
      if (isFavorite) {
        // Quitar de favoritos
        return prevFavorites.filter((fav) => fav.id !== serie.id);
      } else {
        // Añadir a favoritos
        return [...prevFavorites, serie];
      }
    });
  };

  const isFavorite = (serieId) => {
    return favorites.some((fav) => fav.id === serieId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
};
