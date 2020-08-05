import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../styles/SearchPage.module.css";

const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

export default function MovieList({ movies }) {
  return (
    <div className={styles.movie_container}>
      {movies.length > 0 ? (
        movies
          .sort((a, b) => b.popularity - a.popularity) // sort by popularity
          .map((
            movie // create a router link for each result item
          ) => (
            <Link key={`link-${movie.id}`} to={`/details/${movie.id}`}>
              <div key={`item-${movie.id}`} className={styles.movie_item}>
                {movie.poster_path ? (
                  <img
                    src={`${IMAGE_BASE_PATH}/w154/${movie.poster_path}`}
                    className={styles.movie_image}
                    alt={movie.title}
                    name="movie-image"
                  />
                ) : (
                  <div className={styles.image_placeholder}>
                    No image available
                  </div>
                )}
                <div name="movie-title" className={styles.movie_title}>
                  <h5>{movie.original_title}</h5>
                </div>
              </div>
            </Link>
          ))
      ) : (
        <h5 style={{ textAlign: "center" }}>No movies found.</h5>
      )}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
};
