import { Link } from "react-router-dom";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ movies }) => {
  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        listStyle: "none",
        padding: 0,
      }}
    >
      {movies.map((movie) => (
        <li key={movie.id} style={{ width: "200px" }}>
          <Link
            to={`/movies/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
