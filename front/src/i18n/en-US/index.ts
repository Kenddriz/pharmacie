// This is just an example,
// so you can safely delete all default props below

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  contacts: ['Mail', 'Mobile', 'Faxe'],
  provider: {
    'update': 'Modification de fournisseur',
    'add': 'Nouveau fournisseur'
  },
  article: {
    update: 'Modification d\'article',
    add: 'Nouvelle article'
  },
  remove: {
    title: '<strong>Etes-vous sûr de supprimer cet élément ?</strong>',
    softRemove: 'Si vous le supprimer, vous pouvez toujours<br> le récupérer dans la corbeille.',
    removeForever: 'Si vous le supprimer, il sera définitivement supprimé<br> et irrécupérable</br>.'
  },
  local: {
    dateMask: '##/##/####',
    monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aoû', 'Sept', 'Oct', 'Nov', 'Dec'],
    daysShort: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
  },
  meta: {
    itemCount: 'Nombre d\'éléments',
    totalItems: 'Total d\'éléments',
    itemsPerPage: 'Eléments par page',
    totalPages: 'Toal de Pages',
    currentPage: 'Page actuelle'
  },
  sale: {
    cancelLine: 'La quantité vendue se remettra en stock',
    cancelAll: 'Toutes quantités vendues se remettrons en stock'
  },
  measure: {
    delete: {
      formId: 'de la forme',
      dosageId: 'du dosage',
      packagingId: 'de l\'unité de vente'
    }
  },
  otherLayout: {
    dashboard: 'Résultats statistiques',
    trash: 'Eléments supprimés'
  }
};
