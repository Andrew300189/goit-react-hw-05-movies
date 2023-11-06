import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';
import Cast from 'pages/Cast';
import Reviews from 'pages/Reviews';

const Navigation = () => {
  return (
    <div className="container">
      <NavLink to="/" className="link-item">Home</NavLink>
      <NavLink to="/movies" className="link-item">Movies</NavLink>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
