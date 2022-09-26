import { useInfiniteQuery } from 'react-query';
import agent from '../api/agent';

function getAxiosParams(pageParam: number) {
  const params = new URLSearchParams();
  params.append('page', pageParam.toString());
  return params;
}

export const useMovieListQuery = (category: string) => {
  return useInfiniteQuery(
    ['list', category],
    ({ pageParam = 1 }) =>
      agent.MovieCatalog.list(category, getAxiosParams(pageParam)),
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
};
