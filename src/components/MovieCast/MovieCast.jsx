import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      } catch {
        setError("Не вдалося завантажити акторський склад");
      }
    }
    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Інформація про акторів відсутня</p>;

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        listStyle: "none",
        padding: 0,
      }}
    >
      {cast.map(({ cast_id, name, profile_path, character }) => (
        <li key={cast_id} style={{ width: "150px" }}>
          <img
            src={
              profile_path
                ? `${BASE_IMAGE_URL}${profile_path}`
                : "https://via.placeholder.com/150x225?text=No+Image"
            }
            alt={name}
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <p>
            <b>{name}</b>
          </p>
          <p>як {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
