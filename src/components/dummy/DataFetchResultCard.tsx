import { useQuery } from 'react-query';
import { requests } from '../../api/agent';

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

export default function DataFetchResultCard() {
  const params = new URLSearchParams();
  params.append('State', 'Malaysia');
  const { data, isSuccess } = useQuery(
    'test-query',
    //() => requests.get('Record/donation/yearly/daily', params),
    () => requests.get(''),
    { staleTime: twentyFourHoursInMs }
  );

  if (isSuccess) return <div className="w-20">{String(data)}</div>;

  return <div>loading</div>;
}
