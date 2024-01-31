import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { getImageUrl } from "../services/movieServices";

const MovieItem = ({ movie }) => {
  const [like, setLike] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { user } = UserAuth();

  const { title, backdrop_path, poster_path, release_date } = movie;

  const releaseYear = release_date ? release_date.slice(0, 4) : "";

  const markFavShow = async () => {
    const userEmail = user?.email;
    if (userEmail) {
      const userDoc = doc(db, "users", userEmail);
      setLike(!like);
      await updateDoc(userDoc, {
        favShows: arrayUnion({ ...movie }),
      });
    } else {
      setShowLoginPrompt(true);
    }
  };

  const closeLoginPrompt = () => {
    setShowLoginPrompt(false);
  };

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2 text-white ">
      <img
        className="w-full h-40 block object-cover object-top"
        src={getImageUrl(backdrop_path ?? poster_path, "w500")}
        alt={title}
        loading="lazy"
      />
      <div className="absolute top-0 left-0 h-40 bg-black/80 opacity-0 hover:opacity-100 w-full">
        <p className="whitespace-normal text-wrap text-xs md:text-sm flex justify-center items-center h-full font-semibold">
          {movie.title} ({releaseYear})
        </p>
        <p onClick={markFavShow} className="cursor-pointer">
          {like ? (
            <FaHeart size={20} className="absolute top-2 left-2 text-red-500" />
          ) : (
            <FaRegHeart
              size={20}
              className="absolute top-2 left-2 text-gray-300"
            />
          )}
        </p>
      </div>

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-red-600 p-8 max-w-md mx-auto rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Login Required</h2>
            <p>Please login to save your favorite show.</p>
            <button
              className="mt-4 bg-white text-black font-semibold py-2 px-4 rounded"
              onClick={closeLoginPrompt}
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieItem;
