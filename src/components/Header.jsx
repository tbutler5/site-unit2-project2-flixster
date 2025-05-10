import { Movie } from '@mui/icons-material';
import SearchBar from './SearchBar';
import './Header.css';

const Header = ({ setSortBy, searchQuery, setSearchQuery, onSearch, onClear }) => {
  return (
    <header className="App-header">
      <h1><Movie sx={{ fontSize: 40 }} /> Flixster</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={onSearch}
        onClear={onClear}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="title">Title (A-Z)</option>
        <option value="release_date">Release Date (Newest First)</option>
        <option value="rating">Rating (High to Low)</option>
      </select>
    </header>
  );
};

export default Header;