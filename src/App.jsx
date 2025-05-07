import { useState } from "react";
import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import './App.css';

const App = () => {
  const [view, setView] = useState("nowPlaying");

  return (
    <div className="App">
        <div>
          <button onClick={() => setView("nowPlaying")}>Now Playing</button>
          <button onClick={() => setView("search")}>Search</button>
        </div>
        {view === "nowPlaying" ? <MovieList /> : <SearchBar />}
    </div>
  );
};

export default App;