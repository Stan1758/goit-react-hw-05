import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import s from "./MovieCast.module.css";

const TMDB_API_KEY = "93b0cb79b3b41e5fc3225902a3f867e9";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w200";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
        );
        setCast(response.data.cast);
        setError(null);
      } catch {
        setError("Не вдалося завантажити акторський склад");
      }
    }
    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Інформація про акторів відсутня</p>;

  return (
    <ul className={s.castList}>
      {cast.map(({ cast_id, name, profile_path, character }) => (
        <li key={cast_id} className={s.castItem}>
          <img
            src={
              profile_path
                ? `${BASE_IMAGE_URL}${profile_path}`
                : "https://via.placeholder.com/150x225?text=No+Image"
            }
            alt={name}
            className={s.castImg}
          />
          <p className={s.castName}>{name}</p>
          <p className={s.castCharacter}>як {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
