import { useQuery, useResult } from '@vue/apollo-composable';
import { COUNTER, CounterData } from './counter.sdl';

export const useCounter = () => {
  const { result, loading: counterLoading } = useQuery<CounterData>(COUNTER);
  const counts = useResult(result, new CounterData(), res => res);
  return {
    counts,
    counterLoading
  }
}
