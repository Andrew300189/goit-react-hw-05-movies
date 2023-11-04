import React, { useEffect, useState } from 'react';
import { getMovieCast, getPoster } from '../services/api';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const{movieId}=useParams();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const castData = await getMovieCast(movieId);
        setCast(castData.cast);

      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);
  console.log(cast);
  return (
    <div>
      <h2>Cast fdjlsjflsd</h2>
      {cast.map(actor => (
        <div key={actor.id}>
          <img src={getPoster(actor.profile_path)} alt={actor.name} width={50} />
          <p>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </div>
      ))}
    </div>
  );
};

export default Cast;