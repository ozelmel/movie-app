import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    setLoading(true);
    axios
      .get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className="d-flex justify-content-center flex-wrap">
      {loading ? (
        <div className="spinner-border text-primary m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
          movies?.map((movie) => <MovieCard key={movie.id} {...movie} />)
      )}
    </div>
  );
};

export default Main;
