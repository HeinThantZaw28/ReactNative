export interface ApiResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
}

export interface TrendingMovieApiInfo {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: Array<number>;
  popularity: Number;
  release_date: String;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface GenresApiInfo {
  id: number;
  name: string;
}

export interface ProductionCompanyInfo {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountriesInfo {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguagesInfo {
  english_name: 'English';
  iso_639_1: 'en';
  name: 'English';
}

export interface DetailApiResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<GenresApiInfo>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<ProductionCompanyInfo>;
  production_countries: Array<ProductionCountriesInfo>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<SpokenLanguagesInfo>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CastApiInfo {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCreditApiResponse {
  id: number;
  cast: Array<CastApiInfo>;
  crew: Array<CastApiInfo>;
}

export interface PersonDetailApiInfo {
  adult: boolean;
  also_known_as: Array<string>;
  biography: string;
  birthday: string;
  deathday: null;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}
