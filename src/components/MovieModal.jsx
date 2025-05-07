import './MovieModal.css';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + " trailer")}`;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <img
          className="backdrop"
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
        <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        <p>{movie.overview}</p>
        <div className="movie-modal-trailer">
        <a
          href={trailerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="trailer-link"
        >
          🎬 Search Trailer on YouTube
        </a>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
