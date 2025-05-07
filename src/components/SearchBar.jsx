import { useState } from "react";
import MovieCard from "./MovieCard";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
      );
      const data = await res.json();
      setResults(data.results || []);
      setHasSearched(true);
    } catch (err) {
      console.error("Search error:", err);
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
              onClick={() => handleSearch}
            />
          ))
        ) : hasSearched ? (
          <p>No results found.</p>
        ) : null}
      </div>
    </section>
  );
};

export default SearchBar;