import { Fragment } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useMovieSearchQuery } from '../../hooks/useMovieSearchQuery';
import MovieCard from './MovieCard';

interface Props {
  searchTerm: string;
}

export default function MovieSearchListing({ searchTerm }: Props) {
  const {
    data: movieSearchListing,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovieSearchQuery(searchTerm, searchTerm ? true : false);

  useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <>
      <section className="flex flex-wrap gap-10 justify-evenly mt-10">
        {movieSearchListing?.pages.map((movieGroup, index) => {
          return (
            <Fragment key={index}>
              {movieGroup.results.map((movie) => (
                <MovieCard
                  movieItem={movie}
                  key={movie.id}
                />
              ))}
            </Fragment>
          );
        })}
      </section>

      {(isLoading || isFetchingNextPage) && (
        <section className="py-5">
          <AiOutlineLoading className="animate-spin w-10 h-10 mx-auto" />
        </section>
      )}
    </>
  );
}
