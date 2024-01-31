import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Loading from "./Loading";

const MovieItem = lazy(() => import("./MovieItem"));

const MovieRow = ({ title, url }) => {
  const rowId = Math.floor(Math.random() * 1000);
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    axios.get(url).then((response) => setMovies(response.data.results));
  }, [url]);

  const slide = (offset) => {
    const slider = document.getElementById("slider" + rowId);
    slider.scrollLeft += offset;
  };

  return (
    <>
      <h2 className="font-bold md:text-xl p-4 capitalize">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => slide(-500)}
          className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={35}
        />
        <div
          id={`slider` + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          <Suspense fallback={<Loading/>}>
            {movies.map((movie) => (
              <MovieItem key={movie.id} movie={movie} />
            ))}
          </Suspense>
        </div>
        <MdChevronRight
          onClick={() => slide(500)}
          className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
          size={35}
        />
      </div>
    </>
  );
};

export default MovieRow;
