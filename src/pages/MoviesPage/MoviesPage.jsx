import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!queryParam) {
      setMovies([]);
      setError(null);
      return;
    }

    const fetchMovies = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            queryParam
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
  }, [queryParam]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Введіть ключове слово для пошуку");
      setMovies([]);
      setSearchParams({});
      return;
    }

    setSearchParams({ query: trimmedQuery });
  };

  return (
    <div className={styles.container}>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="query"
          placeholder="Введіть назву фільму"
          value={query}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Пошук
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {movies.length > 0 && (
        <MovieList movies={movies} state={{ from: location }} />
      )}
    </div>
  );
};

export default MoviesPage;
