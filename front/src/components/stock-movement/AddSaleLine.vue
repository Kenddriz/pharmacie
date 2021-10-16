<template>
  <q-dialog
    :full-width="!maximized"
    :full-height="!maximized"
    ref="dialogRef"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="maximized"
  >
    <q-card square>
      <q-card-section class="full-height q-pb-lg q-pt-none q-pr-none q-pl-none">
        <q-bar class="bg-teal-14 text-white">
          Ajout de nouvelles lignes pour la vente n°{{saleId}}
          <q-space />
          <q-btn dense flat icon="minimize" @click="maximized = false" :disable="!maximized" />
          <q-btn dense flat icon="crop_square" @click="maximized = true" :disable="maximized" />
          <q-btn dense flat icon="close" v-close-popup />
        </q-bar>
        <TableSale
          :existing-ids="existingIds"
          @sell="done = false; add($event)"
          :done="done"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import TableSale from '../sale/TableSale.vue';
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { useAddSaleLines } from '../../graphql/stock-movement/stock-mvt.service';
import { SaleLineInput } from '../../graphql/types';

export default defineComponent({
  name: 'AddSaleLine',
  components: { TableSale },
  props: {
    saleId: {
      type: Number,
      required: true
    },
    existingIds: Array as PropType<number[]>
  },
  setup(props) {
    const { notify, loading } = useQuasar();
    const done = ref<boolean>(false);
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const { onDone, addSaleLines } = useAddSaleLines();
    onDone(() => {
      loading.hide();
      notify({
        message: 'Enregistrement avec succès',
        position: 'right'
      });
      done.value = true;
      setTimeout(() => onDialogHide(), 1000);
    });
    return {
      dialogRef,
      done,
      maximized: ref<boolean>(true),
      add: (saleLines: SaleLineInput[]) => {
        addSaleLines({ saleLines, saleId: props.saleId })
      }
    }
  }
});
</script>

<style scoped>

</style>
