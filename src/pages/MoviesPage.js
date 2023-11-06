import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import '../index.css';
import { searchMovies } from 'services/api';

const Movies = () => {
const [searchResults, setSearchResults] = useState([]);
const [query, setQuery]=useSearchParams();
const searchValue=query.get('query');
const location = useLocation(); 

useEffect(() => {
  const handleSearch = async (query) => {
    if (query !== null && query.trim() !== '') {
      try {
        const data = await searchMovies(query);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  if (searchValue !== null && searchValue.trim() !== '') {
    handleSearch(searchValue);
  }
}, [searchValue]);

const handleSubmit = (e) => {
  e.preventDefault();
  const query = e.target.elements.query.value;
  
  if (query.trim() !== '') {
    setQuery({ query });
  } else {
    alert('Please enter a search query');
  }
};

  return (
    <div>
      <form  className="search-form" onSubmit={handleSubmit}>
       <input type="text" name="query" />
       <button type="submit">Search</button>
      </form>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id} className="movies">
            <NavLink to={`/movies/${movie.id}`}state={{from:location}}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
