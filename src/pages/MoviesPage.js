
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Movies = () => {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;

    if (query.trim() !== '') {
      history.push(`/movies?query=${query}`);
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
    </div>
  );
};

export default Movies;
