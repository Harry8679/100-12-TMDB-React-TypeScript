import type { MovieDetails, SearchResponse } from '../types';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY as string;
const BASE_URL = 'https://www.omdbapi.com';

if (!API_KEY) {
  console.warn('⚠️ VITE_OMDB_API_KEY is not set in .env file');
}

export const omdbApi = {
  // Rechercher des films
  async searchMovies(
    query: string,
    page: number = 1,
    type?: string,
    year?: string
  ): Promise<SearchResponse> {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      page: page.toString(),
    });

    if (type && type !== 'all') {
      params.append('type', type);
    }

    if (year) {
      params.append('y', year);
    }

    const response = await fetch(`${BASE_URL}/?${params}`);

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const data: SearchResponse = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Aucun résultat trouvé');
    }

    return data;
  },

  // Récupérer les détails d'un film
  async getMovieDetails(imdbID: string): Promise<MovieDetails> {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbID,
      plot: 'full',
    });

    const response = await fetch(`${BASE_URL}/?${params}`);

    if (!response.ok) {
      throw new Error('Erreur réseau');
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Film introuvable');
    }

    return data as MovieDetails;
  },
};