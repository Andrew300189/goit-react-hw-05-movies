import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams, useLocation, Outlet } from 'react-router-dom';
import { getMovieDetails, getMovieCast, getMovieReviews } from '../services/api';
import { getPoster } from '../services/api';
import '../index.css';

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
      <div className="container">
        <Link to="/" className="link-item">Home</Link>
        <Link to="/movies" className="link-item">Movies</Link>
      </div>
      <div>
        <Link to={goBackPath.current} state={{ from: location }} className="link-item">Go back</Link>
      </div>
      <div className="movie-details">
        <div>
          <img src={getPoster(movie.poster_path)} alt={movie.title} width={200} />
        </div>
        <div className="movie-info">
          <h2 className="movie-title">{movie.title}</h2>
          <p className="user-score">User score: {movie.vote_average * 10}%</p>
          <h3 className="info-label">Overview</h3>
          <p className="overview">{movie.overview}</p>
          <h4 className="info-label">Genres</h4>
          <p className="genres">{movie.genres.map(genre => genre.name).join(', ')}</p>
        </div>
      </div>

      <div className="additional-info">
        <p>Additional information</p>
        <ul className="info-list">
          <li>
            <Link to={`/movies/${movieId}/cast`} className="info-link">
              Cast
            </Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/reviews`} className="info-link">
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
