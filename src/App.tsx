import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppContainer from './layout/AppContainer';
import ErrorBoundary from './layout/ErrorBoundary';
import Header from './layout/Header';
import MovieListing from './components/MovieListing/MovieListing';
import MovieModal from './components/MovieModal/MovieModal';
import MovieSearchListing from './components/MovieListing/MovieSearchListing';
import { useAppSelector } from './store/configureStore';
import DataFetchResultCard from './components/dummy/DataFetchResultCard';

const queryClient = new QueryClient();

function App() {
  const { isPreviewActivated, hoveredMovie, isDetailActivated } =
    useAppSelector((state) => state.app);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const debounceUpdate = useCallback(
    debounce((value: string) => setDebouncedSearchTerm(value), 1000),
    []
  );

  function handleSearchOpen() {
    setIsSearchOpen(true);
  }

  function handleSearchClose() {
    setIsSearchOpen(false);
    setSearchTerm('');
    setDebouncedSearchTerm('');
  }

  function updateSearchTermOnChange(event: any) {
    setSearchTerm(event.target.value);
    debounceUpdate(event.target.value);
  }

  useEffect(() => {
    return () => {
      debounceUpdate.cancel();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div data-theme="night">
        <DataFetchResultCard />
        {/* <AppContainer>
          <Header
            isSearchOpen={isSearchOpen}
            searchTerm={searchTerm}
            handleSearchOpen={handleSearchOpen}
            handleSearchClose={handleSearchClose}
            updateSearchOnChange={updateSearchTermOnChange}
          />

          <div className="max-w-6xl mx-auto px-10">
            <ErrorBoundary>
              {isSearchOpen ? (
                <MovieSearchListing searchTerm={debouncedSearchTerm} />
              ) : (
                <MovieListing />
              )}
            </ErrorBoundary>
          </div>
        </AppContainer>

        {(isPreviewActivated || isDetailActivated) && hoveredMovie && (
          <MovieModal movieItem={hoveredMovie} />
        )} */}
      </div>
    </QueryClientProvider>
  );
}

export default App;
