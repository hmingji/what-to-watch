import { Fragment } from 'react';
import { useMovieListQuery } from '../hooks/useMovieListQuery';
import MovieCard from './MovieCard';

export default function AppContainer() {
  const { data } = useMovieListQuery('now_playing');
  return (
    <div className="grid gap-2 m-2">
      {data?.pages.map((movieGroup, index) => {
        return (
          <Fragment key={index}>
            {movieGroup.results.map((movie) => (
              <MovieCard
                movieTitle={movie.title}
                key={movie.id}
              />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}
