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
  return fetchFromTMDB('trending/get-trending');
}

export async function searchMovies(query) {
  const queryParams = `&query=${query}`;
  return fetchFromTMDB('search/search-movies', queryParams);
}

export async function getMovieDetails(movieId) {
  const appendToResponse = 'credits,reviews';
  const queryParams = `&append_to_response=${appendToResponse}`;
  return fetchFromTMDB(`movies/get-movie-details/${movieId}`, queryParams);
}

export async function getMovieCast(movieId) {
  return fetchFromTMDB(`movies/get-movie-credits/${movieId}`);
}

export async function getMovieReviews(movieId) {
  return fetchFromTMDB(`movies/get-movie-reviews/${movieId}`);
}