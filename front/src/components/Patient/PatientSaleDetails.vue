<template>
  <q-dialog full-width full-height ref="dialogRef">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-subtitle1">
          Détails d'achat - N°{{sale.id}} du {{formatDate(sale.createdAt, 'DATE_TIME')}}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <TableUpdateSale :sale="sale" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Sale } from '../../graphql/types';
import { useDialogPluginComponent } from 'quasar';
import TableUpdateSale from '../sale/story/TableUpdateSale.vue';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'PatientSaleDetails',
  components: { TableUpdateSale },
  props: {
    sale: Object as PropType<Sale>
  },
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
