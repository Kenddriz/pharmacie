import { Provider } from '../../graphql/types';
import { date } from 'quasar';

export const columns = [
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
    name: 'address',
    align: 'left',
    label: 'Addresse',
    sortable: true,
    field: (row: Provider) => row.address.substring(0, 25)
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

export const cmdProviderCol = [
  ...columns.slice(0, 2),
  {
    name: 'contacts',
    align: 'left',
    label: 'Contacts',
    field: 'contacts',
    headerStyle: 'font-weight: bold'
  },
  columns[2]
]
