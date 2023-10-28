const API_KEY = 'af286c456a3089045c98b811a363e0ed';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint, queryParams = '') {
  const response = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}${queryParams}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getTrendingMovies() {
  return fetchFromTMDB('trending/movie/day');
}

export async function searchMovies(query) {
  const queryParams = `&query=${query}`;
  return fetchFromTMDB('search/movie', queryParams);
}

export async function getMovieDetails(movieId) {
  const appendToResponse = 'credits,reviews';
  const queryParams = `&append_to_response=${appendToResponse}`;
  return fetchFromTMDB(`movie/${movieId}`, queryParams);
}

export async function getMovieCast(movieId) {
  return fetchFromTMDB(`movie/${movieId}/credits`);
}

export async function getMovieReviews(movieId) {
  return fetchFromTMDB(`movie/${movieId}/reviews`);
}