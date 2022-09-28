import { useQuery } from 'react-query';
import agent from '../api/agent';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useMovieDetailQuery = (id: number, enabled: boolean) => {
  return useQuery(['movieDetail', id], () => agent.MovieCatalog.details(id), {
    enabled: enabled,
    staleTime: twentyFourHoursInMs,
  });
};
