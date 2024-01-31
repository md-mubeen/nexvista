const key = import.meta.env.VITE_TMDB_KEY;
const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
  popular: `${baseUrl}/movie/popular?api_key=${key}&region=IN`,
  topRated: `${baseUrl}/movie/top_rated?api_key=${key}&region=IN`,
  trending: `${baseUrl}/trending/movie/week?api_key=${key}&region=IN`,
  upcoming: `${baseUrl}/movie/upcoming?api_key=${key}`,
  search: (query) =>
    `${baseUrl}/search/movie?api_key=${key}&query=${encodeURIComponent(query)}`,
};

export const getImageUrl = (filename, size) => {
  return `https://image.tmdb.org/t/p/${size}/${filename}`;
};

export default endpoints;
