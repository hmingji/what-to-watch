import classNames from 'classnames';
import debounce from 'lodash.debounce';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useMovieListQuery } from '../hooks/useMovieListQuery';
import { useMovieSearchQuery } from '../hooks/useMovieSearchQuery';
import Header from './Header';
import MovieCard from './MovieCard';

const listOptions = [
  { label: 'Now Playing', value: 'now_playing' },
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

export default function AppContainer() {
  const [list, setList] = useState('now_playing');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isSearchOpenRef = useRef(isSearchOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const movieListing = useMovieListQuery(list, !isSearchOpen);

  const movieSearch = useMovieSearchQuery(
    debouncedSearchTerm,
    isSearchOpen && searchTerm ? true : false
  );

  const debounceUpdate = useCallback(
    debounce((value: string) => setDebouncedSearchTerm(value), 1000),
    []
  );

  function handleSearchOpen() {
    setIsSearchOpen(true);
    isSearchOpenRef.current = true;
  }

  function handleSearchClose() {
    setIsSearchOpen(false);
    isSearchOpenRef.current = false;
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }

  function updateSearchTermOnChange(event: any) {
    setSearchTerm(event.target.value);
    debounceUpdate(event.target.value);
  }

  useEffect(() => {
    let fetching = false;
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (movieListing.hasNextPage && !isSearchOpenRef.current)
          await movieListing.fetchNextPage();
        if (movieSearch.hasNextPage && isSearchOpenRef.current)
          await movieSearch.fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [movieListing.hasNextPage, movieSearch.hasNextPage]);

  return (
    <div
      id="appContainer"
      className={classNames('bg-base-100 pb-20 w-full min-h-screen')}
    >
      <Header
        isSearchOpen={isSearchOpen}
        searchTerm={searchTerm}
        handleSearchOpen={handleSearchOpen}
        handleSearchClose={handleSearchClose}
        updateSearchOnChange={updateSearchTermOnChange}
      />

      <div className="max-w-6xl mx-auto px-10">
        {isSearchOpen ? (
          <div className="flex flex-wrap gap-10 max-w-6xl justify-evenly mt-10">
            {movieSearch.data?.pages.map((movieGroup, index) => {
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
          </div>
        ) : (
          <>
            <div className="flex flex-wrap py-5 justify-between items-center gap-2">
              <h1 className="text-white text-3xl">
                {listOptions.find((option) => option.value === list)?.label}
              </h1>
              <div className="flex flex-wrap gap-1">
                {listOptions.map((option) => (
                  <div
                    key={option.value}
                    className={classNames(
                      'badge badge-secondary',
                      option.value === list
                        ? 'cursor-default'
                        : 'badge-outline cursor-pointer'
                    )}
                    onClick={() => {
                      if (list != option.value) setList(option.value);
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-10 max-w-6xl justify-evenly">
              {movieListing.data?.pages.map((movieGroup, index) => {
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
            </div>
          </>
        )}
      </div>
    </div>
  );
}
