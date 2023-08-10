import React, { useState } from 'react';
import { FormControl, Button } from 'react-bootstrap';

const MovieSearch = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={() => handleSearch(searchTerm)}>
        Search
      </Button>
    </div>
  );
};

export default MovieSearch;
