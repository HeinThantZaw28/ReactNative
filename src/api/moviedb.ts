import axios from 'axios';
import {apiKey} from '../constants';

//baseURL
const baseUrl = 'https://api.themoviedb.org/3';

//endPoint
const trendingMoviesEndPoint = `${baseUrl}/trending/movie/day?api_key=${apiKey} `;
const upcomningMoviesEndPoint = `${baseUrl}/movie/upcoming?api_key=${apiKey} `;
const topRatedMoviesEndPoint = `${baseUrl}/movie/top_rated?api_key=${apiKey} `;

//dynamic endPoint
export const movieDetailsEndPoint = (id: number) =>
  `${baseUrl}/movie/${id}?api_key=${apiKey}`;
export const movieCreditsEndPoint = (id: number) =>
  `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
export const similarMovieEndPoint = (id: number) =>
  `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;
export const personDetailsEndPoint = (id: number) =>
  `${baseUrl}/person/${id}?api_key=${apiKey}`;
export const personMoviesEndPoint = (id: number) =>
  `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;
export const searchMoviesEndPoint = (params: string) =>
  `${baseUrl}/search/movie?api_key=${apiKey}&query=${params}`;

type Params = string | null | Object;
interface ApiCallProps {
  endPoint: string;
  params?: Params;
}

//utils api call
const apiCall = async ({endPoint, params}: ApiCallProps) => {
  const options = {
    method: 'GET',
    url: endPoint,
    params: params ?? {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log('error', err);
    return err;
  }
};

//fetch image
export const fetchImage500 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : undefined;
export const fetchImage342 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : undefined;
export const fetchImage185 = (path: string) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : undefined;

//fallback URL
export const fallbackMoviePoster =
  'https://i.pinimg.com/originals/ad/db/00/addb006995ca0f5c30432eb41a5ed7b3.gif';
export const fallbackPersonImage =
  'https://i.pinimg.com/564x/a2/d9/fc/a2d9fc9fb05e1e7f2b2709cab6db3c67.jpg';

//api Call
export const fetchTrendingMovies = () => {
  return apiCall({endPoint: trendingMoviesEndPoint});
};

export const fetchUpcomingMovies = async () => {
  return await apiCall({endPoint: upcomningMoviesEndPoint});
};

export const fetchTopRatedMovies = async () => {
  return await apiCall({endPoint: topRatedMoviesEndPoint});
};

export const fetchMovieDetails = (id: number) => {
  return apiCall({endPoint: movieDetailsEndPoint(id)});
};
export const fetchMovieCredits = (id: number) => {
  return apiCall({endPoint: movieCreditsEndPoint(id)});
};
export const fetchSimilarMovies = (id: number) => {
  return apiCall({endPoint: similarMovieEndPoint(id)});
};
export const fetchPersonDetail = (id: number) => {
  return apiCall({endPoint: personDetailsEndPoint(id)});
};
export const fetchPersonMovies = (id: number) => {
  return apiCall({endPoint: personMoviesEndPoint(id)});
};
export const fetchSearchMovies = (params: string) => {
  return apiCall({endPoint: searchMoviesEndPoint(params)});
};
