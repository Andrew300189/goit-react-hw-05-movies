import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/HomePage'));
const MoviesPage = lazy(() => import('../pages/MoviesPage'));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage'));

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
          <Route path="/movies/:movieId/reviews" element={<Suspense fallback={<div>Loading...</div>}><ReviewsPage /></Suspense>} />
          <Route path="/movies/:movieId" element={<Suspense fallback={<div>Loading...</div>}><MoviesPage /></Suspense>} />
          <Route path="/movies" element={<Suspense fallback={<div>Loading...</div>}><MoviesPage /></Suspense>} />
          <Route path="/" element={<Suspense fallback={<div>Loading...</div>}><HomePage /></Suspense>} />
          <Navigate to="/" />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
