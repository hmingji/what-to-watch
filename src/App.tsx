import { QueryClient, QueryClientProvider } from 'react-query';
import AppContainer from './components/AppContainer';
import MoviePreviewModal from './components/MoviePreviewModal';
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

  return (
    <QueryClientProvider client={queryClient}>
      <div data-theme="night">
        <AppContainer />

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
