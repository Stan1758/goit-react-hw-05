import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieReviews.module.css";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`
        );
        setReviews(response.data.results);
        setError(null);
      } catch {
        setError("Не вдалося завантажити огляди");
      }
    }
    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>Огляди відсутні</p>;

  return (
    <ul className={s.reviewList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={s.reviewItem}>
          <p className={s.reviewAuthor}>Автор: {author}</p>
          <p className={s.reviewContent}>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
