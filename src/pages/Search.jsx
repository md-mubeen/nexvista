import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import endpoints from "../services/movieServices";
import MovieItem from "../components/MovieItem";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      try {
        const response = await axios.get(endpoints.search(searchQuery));
        setSearchResults(response.data.results);
        setSearchPerformed(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setSearchPerformed(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-24">
      <div className="relative flex space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="py-2 px-4 flex-1 rounded bg-transparent border border-red-600 font-semibold focus:outline-none"
        />
        <Link to="/" className="text-red-500 text-lg flex items-center">
          <FaTimes size={25} />
        </Link>
      </div>

      {searchPerformed && searchResults.length === 0 && (
        <p className="text-red-500 text-2xl">No results found.</p>
      )}

      {searchPerformed && searchResults.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-bold ml-8 mb-2 justify-center">Search Results</h2>
          <div className="flex flex-wrap justify-center">
            {searchResults.map(
              (movie) =>
                (movie.backdrop_path || movie.poster_path) && (
                  <MovieItem key={movie.id} movie={movie} />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
