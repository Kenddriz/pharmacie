import { ref } from 'vue';

export const pItems = [
  {
    label: 'Unités',
    to: 'unit',
    icon: 'ac_unit'
  },
  {
    label: 'Fournisseur',
    to: 'provider',
    icon: 'local_pharmacy'
  },
  {
    label: 'Médicament',
    to: 'medicine',
    icon: 'medication'
  },
  {
    label: 'Commande',
    to: 'command',
    icon: 'touch_app'
  },
  {
    label: 'Facture',
    to: 'invoice',
    icon: 'request_quote'
  },
  {
    label: 'Vente',
    to: 'sale',
    icon: 'shopping_basket'
  }
]

export const sItems = [
  {
    label: 'Résultats statistiques',
    icon: 'dashboard',
    to: 'statistics'
  },
  {
    label: 'Revenu',
    icon: 'settings',
    to: 'income'
  }
]
export const otherLayoutTab = ref<string>('statistics');
