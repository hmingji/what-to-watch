import classNames from 'classnames';
import { Fragment, useState } from 'react';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { useMovieListQuery } from '../../hooks/useMovieListQuery';
import { useAppSelector } from '../../store/configureStore';
import MovieCard from './MovieCard';
import { AiOutlineLoading } from 'react-icons/ai';
import ErrorBoundary from '../../layout/ErrorBoundary';

const listingCategoryOptions = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

export default function MovieListing() {
  const { isDetailActivated } = useAppSelector((state) => state.app);
  const [listingCategory, setListingCategory] = useState(
    listingCategoryOptions[0].value
  );
  const {
    data: movieListing,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useMovieListQuery(listingCategory, !isDetailActivated);

  useInfiniteScroll(fetchNextPage, hasNextPage);

  return (
    <main>
      <header className="flex flex-wrap py-5 justify-between items-center gap-2">
        <h1 className="text-white text-3xl">
          {
            listingCategoryOptions.find(
              (option) => option.value === listingCategory
            )?.label
          }
        </h1>

        <ul className="flex flex-wrap gap-1">
          {listingCategoryOptions.map((option) => (
            <li
              key={option.value}
              className={classNames(
                'badge badge-secondary',
                option.value === listingCategory
                  ? 'cursor-default'
                  : 'badge-outline cursor-pointer'
              )}
              onClick={() => {
                if (listingCategory != option.value)
                  setListingCategory(option.value);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </header>

      <section className="flex flex-wrap gap-10 justify-evenly">
        {movieListing?.pages.map((movieGroup, index) => {
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
    </main>
  );
}
