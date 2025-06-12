import { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}`
        );
        setMovie(response.data);
      } catch (err) {
        setError("Не вдалося завантажити деталі фільму");
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    navigate(location.state?.from || "/movies");
  };

  if (error) {
    return <p className={s.error}>{error}</p>;
  }

  if (!movie) {
    return <p>Завантаження...</p>;
  }

  return (
    <div className={s.container}>
      <button className={s.backButton} onClick={handleGoBack}>
        ← Назад
      </button>

      <div className={s.movieInfo}>
        <img
          className={s.poster}
          src={
            movie.poster_path
              ? `${BASE_IMAGE_URL}${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.title}
        />
        <div className={s.details}>
          <h2 className={s.title}>{movie.title}</h2>
          <p>
            <b>Реліз:</b> {movie.release_date}
          </p>
          <p>
            <b>Рейтинг:</b> {movie.vote_average}
          </p>
          <p>{movie.overview}</p>
        </div>
      </div>

      <nav className={s.nav}>
        <NavLink
          to="cast"
          state={{ from: location.state?.from || "/" }}
          className={({ isActive }) => (isActive ? s.activeNavLink : s.navLink)}
        >
          Актори
        </NavLink>

        <NavLink
          to="reviews"
          state={{ from: location.state?.from || "/" }}
          className={({ isActive }) => (isActive ? s.activeNavLink : s.navLink)}
        >
          Огляди
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
