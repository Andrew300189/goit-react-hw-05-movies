import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Outlet, NavLink } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { getPoster } from '../services/api';
import '../index.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const goBackPath = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieDetails = await getMovieDetails(movieId);
        setMovie(movieDetails);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <NavLink to={goBackPath.current} state={{ from: location }} className="back-button">Go back</NavLink>
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
            <NavLink to={`cast`} className="info-link">
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to={`reviews`} className="info-link">
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
