const MovieCard = ({ movie, onClick }) => {
    console.log(movie.title, movie.poster_path);
    return (
        <div className="movie-card" onClick={() => onClick(movie.id)}>
            <img   
                src= {
                    movie.poster_path !== null
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : 'https://placehold.co/650x900?text=No+Preview'
                } 
                alt={movie.title} />
            <h3>{movie.title.length > 20 ? movie.title.slice(0,20) + "..." : movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
        </div>
    );
};

export default MovieCard;  