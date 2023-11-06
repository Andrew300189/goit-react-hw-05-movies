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
    if (query && query.trim() !== '') {
      try {
        const data = await searchMovies(query);
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      alert('Please enter a search query');
    }
  };
  handleSearch(searchValue);
}, [searchValue])
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    setQuery({query});
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
