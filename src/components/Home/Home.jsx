// src/components/Home/Home.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("batman"); // default search
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies whenever searchTerm changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/movies?s=${searchTerm}`
        );
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data.slice(0, 10) || []); // take first 10
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    const input = e.target.elements.movie.value.trim();
    if (input) setSearchTerm(input);
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

      {loading && <p>Loading movies...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Movie Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        {!loading && !error && movies.length > 0 ? (
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
          !loading && <p>No movies found. Try another search.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
