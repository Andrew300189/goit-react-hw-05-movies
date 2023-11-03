import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    if (query.trim() !== '') {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=af286c456a3089045c98b811a363e0ed&query=${query}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data.results);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please enter a search query');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    handleSearch(query);
  };

  return (
    <div>
      <div className="container">
        <Link to="/" className="link-item">Home</Link>
        <Link to="/movies" className="link-item">Movies</Link>
      </div>
      <form  className="search-form" onSubmit={handleSubmit}>
       <input type="text" name="query" />
       <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id} className="movies">
            <Link to={`/movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
