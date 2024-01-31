import React, { useEffect, useState } from "react";
import endpoints, { getImageUrl } from "../services/movieServices";
import axios from "axios";

function Hero() {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(endpoints.popular)
      .then((response) => {
        const movies = response.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setMovie(randomMovie);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });
  }, []);

  if (!movie) {
    return (
      <div className="w-full h-[250px] md:h-[450px] bg-gradient-to-r from-black text-white flex items-center justify-center">
        <p>Fetching Movie....</p>
      </div>
    );
  }

  const truncate = (str, length) => {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  const { title, backdrop_path, release_date, overview } = movie;

  return (
    <div className="relative w-full h-[350px] md:h-[550px] overflow-hidden">
      <img
        className="w-full h-full object-fit"
        src={getImageUrl(backdrop_path, "original")}
        alt={title}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black opacity-75" />
      <div className="absolute inset-0 flex flex-col  justify-end text-white p-4 md:p-8">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-2 sm:mb-4">
          {title}
        </h1>
        <div className="hidden space-x-4 mb-4 md:flex">
          <button className="capitalize border bg-gray-300 text-black py-2 px-5">
            Play
          </button>
          <button className="capitalize border border-gray-300 py-2 px-5">
            Watch Later
          </button>
        </div>
        <p className="text-gray-400 text-sm mb-2">{release_date}</p>
        <p className="text-gray-200 text-xs sm:text-sm md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] md:font-semibold">
          {truncate(overview, 165)}
        </p>
      </div>
    </div>
  );
}

export default Hero;
