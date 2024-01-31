import React, { useEffect, useState } from "react";
import { arrayRemove, doc, onSnapshot, updateDoc } from "@firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { getImageUrl } from "../services/movieServices";
import Loading from "../components/Loading";

const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  const [showSlider, setShowSlider] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserMovies = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.email);
        onSnapshot(userDoc, (doc) => {
          if (doc.data()) setMovies(doc.data().favShows);
          setLoading(false); 
        });
      }
    };
    fetchUserMovies();
  }, [user?.email]);

  const handleUnlikeshow = async (movie) => {
    try {
      const userDoc = doc(db, "users", user.email);
      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleSliderVisibility = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      setShowSlider(slider.scrollWidth > slider.clientWidth);
    }
  };

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += offset;
  };

  useEffect(() => {
    handleSliderVisibility();
    window.addEventListener("resize", handleSliderVisibility);
    return () => {
      window.removeEventListener("resize", handleSliderVisibility);
    };
  }, [movies]);

  return (
    <>
      {loading && <Loading/>}
      {!loading && (
        <>
          <img
            className="block w-full h-[450px] object-cover"
            src="cover.jpg"
            alt="cover"
          />
          <div className="fixed top-0 left-0 w-full max-h-[500px]" />
          <div className="absolute top-[20%] p-4 md:p-8 text-2xl text-white">
            <h1 className="text-4xl">My Shows</h1>
            <p className="text-gray-400 text-lg">
              {user?.email || "Guest"}
            </p>
          </div>

          <h2 className="font-bold md:text-xl p-4 capitalize">Favorite Shows</h2>
          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(-500)}
              className={`bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 ${
                showSlider ? "block" : "hidden"
              } cursor-pointer`}
              size={40}
            />
            <div
              id={`slider`}
              className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {movies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden m-2"
                >
                  <img
                    className="w-full h-40 block object-cover object-top"
                    src={getImageUrl(
                      movie.backdrop_path ?? movie.poster_path,
                      "w500"
                    )}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 h-40 bg-black/80 opacity-0 hover:opacity-80 w-full text-white">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-semibold">
                      {movie.title}
                    </p>
                    <p>
                      <AiOutlineClose
                        size={30}
                        onClick={() => handleUnlikeshow(movie)}
                        className="absolute top-2 right-2 cursor-pointer"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide(500)}
              className={`bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 ${
                showSlider ? "block" : "hidden"
              } cursor-pointer`}
              size={40}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
