import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=af286c456a3089045c98b811a363e0ed');
        if (response.ok) {
          const data = await response.json();
          setTrendingMovies(data.results);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
      <div>
        <div className="container">
          <Link to="/" className="link-item">Home</Link>
          <Link to="/movies" className="link-item">Movies</Link>
        </div>
        <div>
          <h1>Trending today</h1>
          {trendingMovies.map(movie => (
            <div key={movie.id} className="movies">
              <Link to={`/movies/${movie.id}`}>
                {movie.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );    
  };

export default Home;