import React from 'react';
import "./Movie.css"
import { Card } from 'react-bootstrap';

const MovieList = ({ movies }) => {
  return (
    <div>
      {movies.map((movie) => (
        <Card key={movie.id} className='cardSection'>
          <Card.Img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <Card.Body>
            <Card.Title>{movie.title}</Card.Title>
            <Card.Text>Release Date: {movie.release_date}</Card.Text>
            <Card.Text>Rating: {movie.vote_average}</Card.Text>
            <Card.Text>{movie.overview}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default MovieList;
