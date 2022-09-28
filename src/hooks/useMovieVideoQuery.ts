import { useQuery } from 'react-query';
import agent from '../api/agent';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useMovieVideoQuery = (id: number, enabled: boolean) => {
  return useQuery(['movieVideo', id], () => agent.MovieCatalog.videos(id), {
    enabled: enabled,
    staleTime: twentyFourHoursInMs,
  });
};
