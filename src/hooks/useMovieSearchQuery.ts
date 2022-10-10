import { useInfiniteQuery } from 'react-query';
import agent from '../api/agent';

function fetchMovieSearched(pageParam: number, searchTerm: string) {
  const params = new URLSearchParams();
  params.append('page', `${pageParam}`);
  params.append('query', searchTerm);
  return agent.MovieCatalog.search(params);
}

export const useMovieSearchQuery = (searchTerm: string, isEnabled: boolean) => {
  return useInfiniteQuery(
    ['searchMovie', searchTerm],
    ({ pageParam = 1 }) => fetchMovieSearched(pageParam, searchTerm),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isEnabled,
    }
  );
};
