// src/components/Home/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const APIKey = "c8e7394"; // your OMDb API key

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("batman"); // default search

  // Fetch movies whenever searchTerm changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${APIKey}&s=${searchTerm}&type=movie&page=1`
        );
        const data = await response.json();
        if (data.Search) {
          setMovies(data.Search.slice(0, 10)); // only take first 10
        } else {
          setMovies([]); // no results
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.movie.value.trim();
    if (input) {
      setSearchTerm(input);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Movies</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="movie"
          placeholder="Enter movie title..."
          style={{ padding: "8px", width: "250px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Search
        </button>
      </form>

      {/* Movie Grid */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 across
    gap: "15px",
  }}
>
{movies.length > 0 ? (
  movies.map((movie) => (
    <Link
      key={movie.imdbID}
      to={`/movie/${movie.imdbID}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          textAlign: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/150"
          }
          alt={movie.Title}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "4px",
          }}
        />
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          {movie.Title}
        </p>
      </div>
    </Link>
  ))
) : (
  <p>No movies found. Try another search.</p>
)}
</div>
    </div>
  );
}

export default Home;