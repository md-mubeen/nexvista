import React from "react";
import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";
import endpoints from "../services/movieServices";

function Home() {
  return (
    <>
      <Hero />
      <MovieRow title="upcoming" url={endpoints.upcoming} />
      <MovieRow title="trending" url={endpoints.trending} />
      <MovieRow title="top rated" url={endpoints.topRated} />
      <MovieRow title="popular" url={endpoints.popular} />
    </>
  );
}

export default Home;
