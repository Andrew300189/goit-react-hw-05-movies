import { useEffect, useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);

        const castData = await getMovieCast(movieId);
        setCast(castData);

        const reviewsData = await getMovieReviews(movieId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Ошибка загрузки данных о фильме', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie || !cast || !reviews) {
    return <div>Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div>
      <div>
        <Link to="/">Go back</Link>
      </div>
      <div className="movie-details">
        <div>
          <img src={posterUrl} alt={movie.title} />
        </div>
        <div>
          <h1>{movie.title}</h1>
          <p>User score: {movie.vote_average * 10}%</p>
          <p>Overview: {movie.overview}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div>
        <Link to={`/movies/${movieId}/cast`}>Cast</Link>
        <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
      </div>

      <Routes>
        <Route path={`/movies/${movieId}/cast`} element={<div>{/* Вставьте информацию о касте: {cast} */}</div>} />
        <Route path={`/movies/${movieId}/reviews`} element={<div>{/* Вставьте информацию об обзорах: {reviews} */}</div>} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
