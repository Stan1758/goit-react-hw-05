import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.loaderContainer}>
      <p className={s.loaderText}>Завантаження...</p>
    </div>
  );
};

export default Loader;
