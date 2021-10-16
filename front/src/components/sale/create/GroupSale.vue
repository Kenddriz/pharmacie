<template>
  <SaleType
    v-model="prescription"
    v-model:saleType="saleType"
  />
  <TableSale
    @sell="done = false; createSale($event)"
    :done="done"
    fixed-tool
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SaleType from './SaleType.vue';
import { useQuasar } from 'quasar';
import { useCreateSale } from '../../../graphql/sale/sale.service';
import TableSale from '../TableSale.vue';

export default defineComponent({
  name: 'GroupSale',
  components: {
    SaleType,
    TableSale
  },
  setup() {
    const { notify, loading } = useQuasar();
    const done = ref<boolean>(false);
    const { createSale, prescription, saleType, onDone} = useCreateSale();
    onDone(() => {
      loading.hide();
      notify({
        message: 'Vente a bien été effectuée!',
        position: 'right'
      });
      saleType.value = 'free';
      done.value = true;
    });

    return {
      saleType,
      prescription,
      createSale,
      done
    }
  }
});
</script>

