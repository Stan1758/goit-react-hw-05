import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>На жаль, сторінка, яку ви шукаєте, не існує.</p>
      <Link to="/" style={{ fontSize: "18px", color: "#007bff" }}>
        Повернутись на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
