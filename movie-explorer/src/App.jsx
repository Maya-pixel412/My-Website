import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "10978c5";

function App() {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [debouncedTerm, setDebouncedTerm] = useState("Batman");
  const [typeFilter, setTypeFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState("search");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("movie_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("movie_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch movies from API
  useEffect(() => {
    if (!debouncedTerm.trim()) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(debouncedTerm)}&page=${page}`;
        if (typeFilter) {
          url += `&type=${typeFilter}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setTotalResults(parseInt(data.totalResults, 10));
        } else {
          setMovies([]);
          setTotalResults(0);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [debouncedTerm, typeFilter, page]);

  // Toggle favorite movie
  const toggleFavorite = (movie, e) => {
    e.stopPropagation();
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // Fetch specific movie details for modal preview
  const handleMovieClick = async (id) => {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`,
      );
      const data = await res.json();
      setSelectedMovie(data);
    } catch (err) {
      console.error("Error fetching movie details:", err);
    }
  };

  const totalPages = Math.ceil(totalResults / 10);
  const displayedMovies = activeTab === "search" ? movies : favorites;

  return (
    <div className="App">
      <h1>Movie Explorer</h1>

      <div className="tabs">
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          Search
        </button>
        <button
          className={activeTab === "favorites" ? "active" : ""}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites ({favorites.length})
        </button>
      </div>

      {activeTab === "search" && (
        <div className="controls">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
          />

          <div className="filter-buttons">
            <button
              className={typeFilter === "" ? "filter-btn active" : "filter-btn"}
              onClick={() => {
                setTypeFilter("");
                setPage(1);
              }}
            >
              All Types
            </button>
            <button
              className={
                typeFilter === "movie" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => {
                setTypeFilter("movie");
                setPage(1);
              }}
            >
              Movies
            </button>
            <button
              className={
                typeFilter === "series" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => {
                setTypeFilter("series");
                setPage(1);
              }}
            >
              Series
            </button>
            <button
              className={
                typeFilter === "episode" ? "filter-btn active" : "filter-btn"
              }
              onClick={() => {
                setTypeFilter("episode");
                setPage(1);
              }}
            >
              Episodes
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <div className="movie-grid">
          {displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => {
              const isFav = favorites.some(
                (fav) => fav.imdbID === movie.imdbID,
              );
              return (
                <div
                  key={movie.imdbID}
                  className="movie-card"
                  onClick={() => handleMovieClick(movie.imdbID)}
                >
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    alt={movie.Title}
                  />
                  <div className="card-info">
                    <h3>{movie.Title}</h3>
                    <p>
                      {movie.Year} ({movie.Type})
                    </p>
                    <button
                      className="fav-btn"
                      onClick={(e) => toggleFavorite(movie, e)}
                    >
                      {isFav ? "❤️ Saved" : "🤍 Save"}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-results">No movies found.</p>
          )}
        </div>
      )}

      {activeTab === "search" && totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}

      {selectedMovie && (
        <div className="modal-overlay" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setSelectedMovie(null)}
            >
              ✕
            </button>
            <h2>{selectedMovie.Title}</h2>
            <p>
              <strong>Genre:</strong> {selectedMovie.Genre}
            </p>
            <p>
              <strong>Actors:</strong> {selectedMovie.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {selectedMovie.Plot}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
