import { useQuery, useResult } from '@vue/apollo-composable';
import { CURRENT_USER, WhoAmIData } from './whoAmI.sdl';

export const useWHoAmI = () => {
  const { loading, result } = useQuery<WhoAmIData>(CURRENT_USER);
  const Iam = useResult(result, null, res => res?.whoAmI);
  return { loading, Iam }
}
