import React, { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import Moviecard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=78a20100";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (value) => {
    console.log("value >>> ", value);

    setSearchTerm(value);

    const response = await fetch(`${API_URL}&s=${value}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("latest");
  }, []);
  return (
    <div className="app">
      <h1 onClick={() => searchMovies("latest")}>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            searchMovies(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />

        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Moviecard movie={movie} />
          ))}
        </div>
      ) : (
        <div>
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
