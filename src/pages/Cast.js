import React from 'react';
import { getPoster } from '../services/api';

const Cast = ({ cast }) => {
  return (
    <div>
      <h2>Cast</h2>
      {cast.map(actor => (
        <div key={actor.id}>
          <img src={getPoster(actor.profile_path)} alt={actor.name} width={200} />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;
