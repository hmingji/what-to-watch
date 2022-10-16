import axios, { AxiosError, AxiosResponse } from 'axios';
import { MovieCreditResponse } from '../models/movieCredits';
import { MovieDetailsResponse } from '../models/movieDetails';
import {
  MovieListResponse,
  MovieSearchListResponse,
} from '../models/movieList';
import { MovieVideosResponse } from '../models/movieVideos';

axios.defaults.baseURL = process.env.REACT_APP_MOVIEAPI_URL;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  if (
    config.params instanceof URLSearchParams &&
    process.env.REACT_APP_MOVIEAPI_KEY
  ) {
    config.params.append('api_key', process.env.REACT_APP_MOVIEAPI_KEY);
  } else {
    config.params = {
      ...config.params,
      api_key: process.env.REACT_APP_MOVIEAPI_KEY,
    };
  }

  return config;
});

const requests = {
  get: <ResType>(url: string, params?: URLSearchParams) =>
    axios
      .get<ResType>(url, { params })
      .then(responseBody)
      .catch((error: AxiosError) => {
        throw error;
        console.log(error);
      }),
};

const MovieCatalog = {
  list: (
    category: string,
    params?: URLSearchParams
  ): Promise<MovieListResponse> =>
    requests.get<MovieListResponse>(`movie/${category}`, params),
  details: (
    movieId: number,
    params?: URLSearchParams
  ): Promise<MovieDetailsResponse> =>
    requests.get<MovieDetailsResponse>(`movie/${movieId}`, params),
  videos: (movieId: number): Promise<MovieVideosResponse> =>
    requests.get<MovieVideosResponse>(`movie/${movieId}/videos`),
  search: (params: URLSearchParams): Promise<MovieSearchListResponse> =>
    requests.get<MovieSearchListResponse>(`search/movie`, params),
  credits: (movieId: number): Promise<MovieCreditResponse> =>
    requests.get<MovieCreditResponse>(`movie/${movieId}/credits`),
};

const agent = { MovieCatalog };

export default agent;
