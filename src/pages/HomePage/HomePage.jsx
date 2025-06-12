import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
        );

        setMovies(response.data.results);
      } catch (err) {
        setError("Не вдалося завантажити фільми");
        console.error(err);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <div>
      <h1>Популярні фільми</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
