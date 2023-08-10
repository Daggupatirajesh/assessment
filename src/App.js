import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import MovieSearch from './components/MovieSearch';
import MovieList from './components/MovieList';
import { Form, Button } from 'react-bootstrap';

const API_KEY = '3a80350ad3de0e275fb7c393980b352c';
const API_URL = 'https://api.themoviedb.org/3/search/movie';

function App() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('release_date'); // Default sorting
  const [filterByRating, setFilterByRating] = useState(0); // Default no filter

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          query: searchTerm,
          page: currentPage, // Add current page to the request
        },
      });

      // Sort movies based on sortBy criteria
      let sortedMovies = response.data.results;
      if (sortBy === 'release_date') {
        sortedMovies = response.data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      } else if (sortBy === 'rating') {
        sortedMovies = response.data.results.sort((a, b) => b.vote_average - a.vote_average);
      }

      // Filter movies based on filterByRating
      if (filterByRating > 0) {
        sortedMovies = sortedMovies.filter((movie) => movie.vote_average >= filterByRating);
      }

      setMovies(sortedMovies);
      setTotalPages(response.data.total_pages); // Update total pages
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Movie Search App</h1>
      <MovieSearch handleSearch={handleSearch} />
      <Form.Group className="mb-3">
        <Form.Label>Sort By:</Form.Label>
        <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="release_date">Release Date</option>
          <option value="rating">Rating</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Filter By Rating:</Form.Label>
        <Form.Control
          type="number"
          min={0}
          max={10}
          value={filterByRating}
          onChange={(e) => setFilterByRating(Number(e.target.value))}
        />
      </Form.Group>
      <MovieList movies={movies} />
      <div className="pagination">
        <Button variant="outline-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="page-info">{currentPage} / {totalPages}</span>
        <Button variant="outline-primary" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;

