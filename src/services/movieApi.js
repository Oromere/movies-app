const BASE_REQUEST = process.env.REACT_APP_MOVIE_DB_API;
const API_KEY = process.env.REACT_APP_API_KEY;

/**
 * Fetches and returns movies with given query string
 * @param {string} query search string
 * @param {number} page page of pagination
 */
export const searchMovies = async (query, page = 1) => {
  // replace whitespace with "+""
  query = query.replace(/\s/g, "+");
  // build request
  const request = `${BASE_REQUEST}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  const response = await fetch(request).catch((error) => {
    //TypeError: Failed to fetch
    console.log(error);
    alert("That didn't work")
  });

  if (response.ok) {
    const result = await response.json();
    return result;
  } else {
    return {
        results: [],
        total_pages: 0
    }
        
  }
};

/**
 * Fetches and returns details about the given movie
 * @param {number} movieID The id of the movie to query details for
 */
export const getMovieDetails = async (movieID) => {
    const request = `${BASE_REQUEST}/movie/${movieID}?api_key=${API_KEY}`;
    const response = await fetch(request).catch((error) => {
        //TypeError: Failed to fetch
        console.log(error);
        alert("That didn't work")
      });
    
      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        return {}
      }
}
