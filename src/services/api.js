const API_KEY = 'af286c456a3089045c98b811a363e0ed';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchFromTMDB(endpoint, queryParams = '') {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}?api_key=${API_KEY}${queryParams}`);
    
    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    console.error('Network error:', error.message);
    throw new Error('Network error occurred');
  }
}

export async function searchMovies(query) {
  try {
    const queryParams = `&query=${query}`;
    const response = await fetchFromTMDB('search/movie', queryParams);
    return response;
  } catch (error) {
    console.error('Error fetching searchMovies:', error);
    throw new Error('Search movies error');
  }
}

export async function getMovieDetails(movieId) {
  try {
    const appendToResponse = 'credits,reviews';
    const queryParams = `&append_to_response=${appendToResponse}`;
    const response = await fetchFromTMDB(`movie/${movieId}`, queryParams);
    return response;
  } catch (error) {
    console.error('Error fetching getMovieDetails:', error);
    throw new Error('Get movie details error');
  }
}

export async function getMovieCast(movieId) {
  try {
    const response = await fetchFromTMDB(`movie/${movieId}/credits`);
    return response;
  } catch (error) {
    console.error('Error fetching getMovieCast:', error);
    throw new Error('Get movie cast error');
  }
}

export async function getMovieReviews(movieId) {
  try {
    const response = await fetchFromTMDB(`movie/${movieId}/reviews`);
    return response;
  } catch (error) {
    console.error('Error fetching getMovieReviews:', error);
    throw new Error('Get movie reviews error');
  }
}


export const getPoster = (url) => {
    const defaultImgUrl = 'https://fakeimg.pl/400x600';
    return url ? `https://image.tmdb.org/t/p/w500/${url}` : defaultImgUrl;
  };
  