import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map(movie => (
          <div key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
