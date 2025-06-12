import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loader from "../src/components/Loader/Loader";
const Navigation = lazy(() => import("./components/Navigation/Navigation"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
