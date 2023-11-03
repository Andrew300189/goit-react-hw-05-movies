import React, { useEffect, useState, useRef } from 'react';
import { Link, Route, Routes, useParams, useLocation, Outlet } from 'react-router-dom';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../services/api';
import Cast from './Cast';
import Reviews from './Reviews';
import { getPoster } from '../services/api';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState(null);
  const [reviews, setReviews] = useState(null);
  const location = useLocation();

  const goBackPath = useRef(location.state?.from ?? '/');

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
        console.error('Error', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie || !cast || reviews === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </div>
      <div>
        <Link to={goBackPath.current}>Go back</Link>
      </div>
      <div className="movie-details">
        <div>
          <img src={getPoster(movie.poster_path)} alt={movie.title} width={200} />
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

      <Outlet />

      <Routes>
        <Route path="cast" element={<Cast cast={cast} />} />
        <Route path="reviews" element={<Reviews reviews={reviews} />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;