import { MovieListItem } from './movieList';

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  name: string;
  id: number;
  logo_path?: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type Language = {
  iso_639_1: string;
  name: string;
};

export type MovieDetailsResponse = Omit<MovieListItem, 'genre_ids'> & {
  belongs_to_collection?: Record<string, unknown>;
  budget: number;
  genres: Genre[];
  homepage?: string;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime?: number;
  spoken_languages: Language[];
  status:
    | 'Rumored'
    | 'Planned'
    | 'In Production'
    | 'Post Production'
    | 'Released'
    | 'Canceled';
  tagline?: string;
};
