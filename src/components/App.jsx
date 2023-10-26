import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import ReviewsPage from '../pages/ReviewsPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/movies">Movies</a>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/movies/:movieId/reviews">
            <ReviewsPage />
          </Route>
          <Route path="/movies/:movieId">
            <MoviesPage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Navigate to="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
