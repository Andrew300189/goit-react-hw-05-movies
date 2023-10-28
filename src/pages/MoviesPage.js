import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;

    if (query.trim() !== '') {
      try {
        const response = await fetch(`/search/movies?query=${query}`);
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

  return (
    <div>
      <h1>Movies Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Enter movie name" />
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