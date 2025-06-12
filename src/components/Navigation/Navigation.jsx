import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";

const Navigation = () => (
  <nav className={s.nav}>
    <NavLink
      to="/"
      end
      className={({ isActive }) => (isActive ? s.activeLink : s.link)}
    >
      Головна
    </NavLink>
    <NavLink
      to="/movies"
      className={({ isActive }) => (isActive ? s.activeLink : s.link)}
    >
      Пошук фільмів
    </NavLink>
  </nav>
);

export default Navigation;
