import {useQuery, useResult} from '@vue/apollo-composable';
import {PROVIDERS, ProvidersData} from './providers.sdl';
import {Provider} from '../../types';
import { date } from 'quasar';

const columns = [
  {
    name: 'id',
    align: 'left',
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    align: 'left',
    label: 'Nom',
    sortable: true,
    field: 'name'
  },
  {
    name: 'createdAt',
    align: 'left',
    label: 'Date de création',
    field: (row: Provider) => date.formatDate(row.createdAt, 'DD/MM/YYYY à hh:mm:ss'),
    sortable: true
  },
  {
    name: 'updatedAt',
    align: 'left',
    label: 'Dernière modification',
    field: (row: Provider) => date.formatDate(row.updatedAt, 'DD/MM/YYYY à hh:mm:ss'),
    sortable: true
  }
];

export const useProviders = () => {
  const { result, loading } = useQuery<ProvidersData>(PROVIDERS);
    return {
      loading,
      providers: useResult(result, [], res => res.providers),
      columns
    }
}
