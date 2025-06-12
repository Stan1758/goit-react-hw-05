import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`
        );

        if (response.data.results.length === 0) {
          setError("Нічого не знайдено");
          setMovies([]);
        } else {
          setMovies(response.data.results);
        }
      } catch (err) {
        setError("Помилка під час пошуку фільмів");
        setMovies([]);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.currentTarget.elements.query.value.trim();

    if (!input) {
      setError("Введіть ключове слово для пошуку");
      setMovies([]);
      setSearchParams({});
      return;
    }

    setSearchParams({ query: input });
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Введіть назву фільму"
          defaultValue={query}
        />
        <button type="submit">Пошук</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} state={{ from: location }} />
    </div>
  );
};

export default MoviesPage;
