import { useQuery } from 'react-query';
import agent from '../api/agent';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export const useMovieCreditQuery = (id: number, enabled: boolean) => {
  return useQuery(['movieCredit', id], () => agent.MovieCatalog.credits(id), {
    enabled: enabled,
    staleTime: twentyFourHoursInMs,
  });
};
