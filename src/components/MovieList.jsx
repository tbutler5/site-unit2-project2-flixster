import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchMovies = async (pageNumber = 1) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`
      );
      const data = await res.json();
      if (pageNumber === 1) {
        setMovies(data.results);
      } else {
        setMovies(prev => [...prev, ...data.results]);
      }
      setHasMore(pageNumber < data.total_pages);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

    useEffect(() => {
        fetchMovies(1);
    }, []);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        fetchMovies(nextPage);
        setPage(nextPage);
    };

    const handleMovieClick = async (movieId) => {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
        const data = await res.json();
        setSelectedMovie(data);
    };
    
    const getSortedMovies = () => {
        const sorted = [...movies];
        switch (sortBy) {
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'release_date':
                return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
            case 'rating':
                return sorted.sort((a, b) => b.vote_average - a.vote_average);
            default:
                return sorted;
        }
    };

    const sortedMovies = getSortedMovies();


    return (
        <main>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="">Sort By</option>
                <option value="title">Title (A-Z)</option>
                <option value="release_date">Release Date (Newest First)</option>
                <option value="rating">Rating (High to Low)</option>
            </select>
            <div className="movie-list">
                {sortedMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} onClick={handleMovieClick} />
                ))}
            </div>
            {hasMore && (
                <button onClick={handleLoadMore} className="load-more">
                Load More
                </button>
            )}
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        </main>
    );
};

export default MovieList;