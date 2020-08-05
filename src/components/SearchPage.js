import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import { searchMovies } from "../services/movieApi";
import MovieList from "./MovieList";
import "../styles/pagination.css";
import styles from "../styles/SearchPage.module.css";

export default function SearchPage() {
  const [searchString, setSearchString] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // fetch new movies, when searchString or page changed
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await searchMovies(searchString, page);
      setMovies(response.results);
      setPageCount(response.total_pages);
    };
    fetchMovies();
  }, [searchString, page]);

  const onPageChange = (selectedPage) => {
    window.scrollTo(0, 0);
    setPage(selectedPage);
  };

  return (
    <div className={styles.search_page_container}>
      <header className={styles.header}>
        <h1>Movie Search</h1>
      </header>
      <div className={styles.search_bar}>
        <label>Search </label>
        <input
          type="text"
          name="movie-search-input"
          value={searchString}
          onChange={(event) => setSearchString(event.target.value)}
          placeholder="Search a movie"
        />
      </div>
      <main className={styles.content}>
        <MovieList movies={movies} />
      </main>
      <footer className={styles.pagination_bar}>
        {movies.length > 0 && (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount - 1} // pagination components starts with 0 and api with 1
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={(page) => onPageChange(page.selected + 1)} // pagination components starts with 0 and api with 1
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        )}
      </footer>
    </div>
  );
}
