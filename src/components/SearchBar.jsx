import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from './MovieModal';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const apiKey = import.meta.env.VITE_API_KEY;


  const handleMovieClick = async (movieId) => {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
      const data = await res.json();
      setSelectedMovie(data);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&page=1`
      );
      const data = await res.json();
      setResults(data.results || []);
      setHasSearched(true);
      setPage(1);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}&page=${nextPage}`
      );
      const data = await res.json();
      setResults((prevResults) => [...prevResults, ...(data.results || [])]);
      setPage(nextPage);
    } catch (err) {
      console.error("Load more error:", err);
    }
  };

  return (
    <section>
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} disabled={!searchQuery.trim()}>
        Search
      </button>

      <div className="movie-list">
        {results.length > 0 ? (
          results.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))
        ) : hasSearched ? (
          <p>No results found.</p>
        ) : null}
      </div>
      {hasSearched && page < totalPages && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </section>
  );
};

export default SearchBar;