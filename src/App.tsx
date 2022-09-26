import React, { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppContainer from './components/AppContainer';
import MovieCard from './components/MovieCard';
import { useMovieListQuery } from './hooks/useMovieListQuery';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        data-theme="lofi"
        className="flex flex-col mx-auto sm:w-9/12 min-h-screen"
      >
        <AppContainer />
      </div>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      />
    </QueryClientProvider>
  );
}

export default App;
