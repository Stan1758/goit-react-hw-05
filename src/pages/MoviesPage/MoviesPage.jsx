import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Введіть ключове слово для пошуку");
      setMovies([]);
      return;
    }

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
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введіть назву фільму"
          value={query}
          onChange={handleChange}
        />
        <button type="submit">Пошук</button>
      </form>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
