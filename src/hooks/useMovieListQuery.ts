import { useInfiniteQuery } from 'react-query';
import agent from '../api/agent';

function fetchMovieList(pageParam: number, category: string) {
  const params = new URLSearchParams();
  params.append('page', `${pageParam}`);
  return agent.MovieCatalog.list(category, params);
}

export const useMovieListQuery = (category: string, isEnabled: boolean) => {
  return useInfiniteQuery(
    ['list', category],
    ({ pageParam = 1 }) => fetchMovieList(pageParam, category),
    {
      getNextPageParam: (lastPage) => {
        console.log(
          `page: ${lastPage.page}, total pages: ${lastPage.total_pages} `
        );
        if (lastPage.page < lastPage.total_pages) {
          console.log(`returning ${lastPage.page + 1}`);
          return lastPage.page + 1;
        }
        return undefined;
      },
      refetchOnWindowFocus: false,
      enabled: isEnabled,
    }
  );
};
