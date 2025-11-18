const API_BASE_URL = 'https://api.tvmaze.com';

export const getAllShows = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Error al obtener las series');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getAllShows:', error);
    throw error;
  }
};
