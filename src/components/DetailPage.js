import React, { useState, useEffect } from "react";

import styles from "../styles/DetailPage.module.css";
import { getMovieDetails } from "../services/movieApi";

const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

export default function DetailPage(props) {
  const movieId = props.match.params.id;
  const [movie, setMovie] = useState({});

  // fetch movie when page is loaded
  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await getMovieDetails(movieId);
      setMovie(response);
    };
    fetchMovieDetails();
  }, [movieId]);

  const detailItemClass = "col-xs-6 col-sm-6 col-md-4 col-lg-3";
  return (
    <div className={styles.container}>
      <header>
        <button
          type="button"
          title="back-button"
          className={styles.back_btn}
          onClick={() => props.history.push("/")}
        >
          Back
        </button>
        <h1>Movie Detail</h1>
      </header>
      <main className={[styles.main, "row"].join(" ")}>
        <div className={styles.image}>
          {movie.poster_path ? (
            <img
              src={`${IMAGE_BASE_PATH}/w300/${movie.poster_path}`}
              className={styles.movie_image}
              alt={movie.title}
              title="movie-poster"
            />
          ) : (
            <div className={styles.image_placeholder}>No image available</div>
          )}
          {movie && movie.tagline && (
            <p>
              <i title="movie-quote" className={styles.quote}>
                "{movie.tagline}"
              </i>
            </p>
          )}
        </div>
        <div
          className={[
            styles.info,
            "col-xs-12",
            "col-sm-6",
            "col-md-6",
            "col-lg-6",
          ].join(" ")}
        >
          <div className="row">
            <div title="title">
              {" "}
              <h2 className={styles.movie_title}>{movie.title}</h2>
            </div>
            <div title="votes" className={styles.votes}>
              {movie && <b>{movie.vote_average}</b>}
              {movie && ` - ${movie.vote_count} Votes`}
            </div>
          </div>
          <div
            title="genres"
            className={[styles.movie_genres, "row"].join(" ")}
          >
            <ul>
              {movie &&
                movie.genres &&
                movie.genres.map((genre) => (
                  <li key={genre.id} className={styles.movie_genre}>
                    {genre.name}
                  </li>
                ))}
            </ul>
          </div>
          <div title="overview" className="row">
            {getValueSafe(movie, "overview")}
          </div>
          <h3 className="row">Details</h3>
          <div className="row">
            <p className={detailItemClass}>
              <label>Runtime: </label>
              {getValueSafe(movie, "runtime", " - ", " minutes")}
            </p>
            <p className={detailItemClass}>
              <label>Release date: </label>
              {getValueSafe(movie, "release_date", " - ")}
            </p>
          </div>
          <div className="row">
            <p className={detailItemClass}>
              <label>Original language: </label>
              {getValueSafe(movie, "original_language", " - ").toUpperCase()}
            </p>
            <p className={detailItemClass}>
              <label>Popularity Score: </label>
              {getValueSafe(movie, "popularity", " - ")}
            </p>
          </div>
          <h3 className="row">Box Office</h3>
          <div className="row">
            <p className={detailItemClass}>
              <label>Revenue: </label>
              {getValueSafe(movie, "revenue", " - ", " $")}
            </p>
            <p className={detailItemClass}>
              <label>Budget: </label>
              {getValueSafe(movie, "budget", " - ", " $")}
            </p>
          </div>
          <h3 className="row">Production</h3>
          <div className={["row", styles.production].join(" ")}>
            <div className={detailItemClass}>
              <label>Studios: </label>
              <ul>
                {getValueSafe(movie, "production_companies", []).map(
                  (studio) => (
                    <li key={studio.id}>{studio.name}</li>
                  )
                )}
              </ul>
            </div>
            <div className={detailItemClass}>
              <label>Countries: </label>
              <ul>
                {getValueSafe(movie, "production_countries", []).map(
                  (country) => (
                    <li key={country.iso_3166_1}>{country.name}</li>
                  )
                )}
              </ul>
            </div>
          </div>
          <h3 className="row">Links</h3>
          <div className={["row", styles.links].join(" ")}>
            {movie && movie.homepage && (
              <p className={detailItemClass}>
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Homepage
                </a>
              </p>
            )}

            {movie && movie.imdb_id && (
              <p className={detailItemClass}>
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IMDb
                </a>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/**
 *
 * @param {object} object The object you want to retrieve the value from
 * @param {string} key The key of the value you want
 * @param {*} defaultReturn Default return value, if the wanted value is null or undefined
 * @param {*} info Some extra infos that get added to the value string
 */
const getValueSafe = (object, key, defaultReturn, info) => {
  if (object && object[key]) {
    return info ? object[key] + info : object[key];
  } else {
    return defaultReturn;
  }
};
