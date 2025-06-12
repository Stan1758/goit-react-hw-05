import { NavLink } from "react-router-dom";

const Navigation = () => (
  <nav>
    <NavLink to="/" end>
      Головна
    </NavLink>{" "}
    | <NavLink to="/movies">Пошук фільмів</NavLink>
  </nav>
);

export default Navigation;
