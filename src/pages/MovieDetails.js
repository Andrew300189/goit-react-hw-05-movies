import React, { useEffect, useState } from 'react';
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
        console.error('Error', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie || !cast || reviews === null) {
    return <div>Loading...</div>;
  }

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const Cast = ({ cast }) => {
    return (
      <div>
        <h2>Cast</h2>
        {cast.map(actor => (
          <div key={actor.id}>
            <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        ))}
      </div>
    );
  };

  const Reviews = ({ reviews }) => {
    return (
      <div>
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id}>
              <p>Author: {review.author}</p>
              <p>Content: {review.content}</p>
            </div>
          ))
        ) : (
          <div>We don't have any reviews for this movie.</div>
        )}
      </div>
    );
  };

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
        <Route path={`/movies/${movieId}/cast`} element={<Cast cast={cast} />} />
        <Route path={`/movies/${movieId}/reviews`} element={<Reviews reviews={reviews} />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
