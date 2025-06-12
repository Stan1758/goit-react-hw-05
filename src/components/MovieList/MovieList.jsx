import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w300";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={s.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.movieItem}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={s.movieLink}
          >
            <img
              src={
                movie.poster_path
                  ? `${BASE_IMAGE_URL}${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              className={s.movieImg}
            />
            <p className={s.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
