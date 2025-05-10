import { useState, useEffect } from "react";
import MovieList from './components/MovieList';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

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

  const getFilteredAndSortedMovies = () => {
    let filtered = movies;
    if (activeSearch.trim()) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(activeSearch.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'release_date':
        return filtered.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
      case 'rating':
        return filtered.sort((a, b) => b.vote_average - a.vote_average);
      default:
        return filtered;
    }
  };

  const visibleMovies = getFilteredAndSortedMovies();

  return (
    <>
      <Header
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => setActiveSearch(searchQuery)}
        onClear={() => {
          setSearchQuery('');
          setActiveSearch('');
        }}
      />
      <div className="App">
        <MovieList
          movies={visibleMovies}
          hasMore={hasMore}
          handleLoadMore={handleLoadMore}
        />
      </div>
      <Footer />
    </>
  );
};

export default App;