import { Fragment } from 'react';
import { useMovieListQuery } from '../hooks/useMovieListQuery';
import MovieCard from './MovieCard';

export default function AppContainer() {
  const { data } = useMovieListQuery('now_playing');
  return (
    <div className="flex flex-wrap gap-5 m-2">
      {data?.pages.map((movieGroup, index) => {
        return (
          <Fragment key={index}>
            {movieGroup.results.map((movie) => (
              <MovieCard
                title={movie.title}
                id={movie.id}
                poster_path={movie.poster_path}
                key={movie.id}
              />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
