import { useState, useEffect } from "react";
import {
  Outlet,
  NavLink,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";

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
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/movies");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Завантаження...</p>;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Go back</button>
      <h2>{movie.title}</h2>
      <img src={`${BASE_IMAGE_URL}${movie.poster_path}`} alt={movie.title} />
      <p>Реліз: {movie.release_date}</p>
      <p>Рейтинг: {movie.vote_average}</p>
      <p>{movie.overview}</p>

      {/* Навігація по вкладках */}
      <nav style={{ marginTop: "20px" }}>
        {/* <NavLink
          to=""
          end
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            marginRight: "10px",
          })}
        >
          Details
        </NavLink> */}
        <NavLink
          to="cast"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            marginRight: "10px",
          })}
        >
          Cast
        </NavLink>
        <NavLink to="reviews">Reviews</NavLink>
        <Outlet />
        {/* Можна пізніше додати Reviews */}
        {/* <NavLink to="reviews" style={({ isActive }) => ({ fontWeight: isActive ? "bold" : "normal" })}>
          Reviews
        </NavLink> */}
      </nav>
    </div>
  );
};

export default MovieDetailsPage;
