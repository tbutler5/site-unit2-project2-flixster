import { useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieList = ({ movies, hasMore, handleLoadMore }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleMovieClick = async (movieId) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    const data = await res.json();
    setSelectedMovie(data);
  };

  return (
    <main>
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} onClick={() => handleMovieClick(movie.id)} />
        ))}
      </div>
      {hasMore && (
        <button onClick={handleLoadMore} className="load-more">Load More</button>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </main>
  );
};

export default MovieList;