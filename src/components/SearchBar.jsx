const SearchBar = ({ searchQuery, setSearchQuery, onSearch, onClear }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
      <button onClick={onClear}>Clear</button>
    </div>
  );
};

export default SearchBar;