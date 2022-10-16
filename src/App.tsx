import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppContainer from './components/AppContainer';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import MovieListing from './components/MovieListing';
import MoviePreviewModal from './components/MoviePreviewModal';
import MovieSearchListing from './components/MovieSearchListing';
import { useAppSelector } from './store/configureStore';

const queryClient = new QueryClient();

function App() {
  const {
    isPreviewActivated,
    hoveredCardLeft,
    hoveredCardTop,
    hoveredMovie,
    isDetailActivated,
  } = useAppSelector((state) => state.app);
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
        <AppContainer>
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
          <MoviePreviewModal
            movieItem={hoveredMovie}
            top={hoveredCardTop}
            left={hoveredCardLeft}
          />
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
