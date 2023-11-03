import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
    </Routes>
  );
};

export default App;
