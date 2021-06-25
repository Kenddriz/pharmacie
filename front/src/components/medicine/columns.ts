export const MEDICINE_COLS = [
  { name: 'expand'},
  { name: 'id',
    align: 'left',
    label: 'ID',
    field: 'id',
    sortable: true,
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'designation', align: 'left', label: 'Désignation',
    field: 'designation', sortable: true,
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'form',
    align: 'left',
    label: 'Nombre de formes',
    field: 'medicineForms',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'update',
    align: 'center',
    label: 'Actions',
    headerStyle: 'font-weight: bold'
  }
]
export const FORM_COLUMNS = [
  {
    name: 'formId',
    align: 'left',
    label: 'Forme',
    field: 'formId',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'unitId',
    align: 'left',
    label: 'Unité minimale',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'quantity',
    align: 'left',
    label: 'Quantité',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'expiration',
    align: 'left',
    label: 'Péremption',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'vat',
    align: 'left',
    label: 'TVA',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'price',
    align: 'left',
    label: 'Prix Unitaire de vente',
    headerStyle: 'font-weight: bold'
  },
  {
    name: 'action',
    align: 'left',
    label: 'Action',
    headerStyle: 'font-weight: bold'
  }
]
