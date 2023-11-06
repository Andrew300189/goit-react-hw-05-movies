import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css';
import { getTrendingMovies } from 'services/api';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchTrendingMovies();
  }, []);

  return (
      <div>
        <div>
          <h1>Trending today</h1>
          {trendingMovies.map(movie => (
            <div key={movie.id} className="movies">
              <NavLink to={`/movies/${movie.id}`}>
                {movie.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );    
  };

export default Home;