import { Link } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.notfoundContainer}>
      <div className={s.notfoundCard}>
        <h1>404 - Сторінку не знайдено</h1>
        <p>На жаль, сторінка, яку ви шукаєте, не існує.</p>
        <Link to="/" className={s.homeLink}>
          Повернутись на головну
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
