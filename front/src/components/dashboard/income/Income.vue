<template>
  <div class="row q-gutter-x-sm wrap q-pl-md overflow-hidden">
    <InvoiceList
      :height="210"
      class="col-12 col-md-4"
      v-model="pInvoice.selected"
      v-model:total="pInvoice.total"
      v-model:p-loading="pInvoice.loading"
      activated
    />
    <div class="col bordered-left q-pa-sm" v-if="pInvoice.selected.length">
      <Gain :invoice="pInvoice.selected[0]" />
      <Divider align="center" class="text-blue-grey-14 text-body2 q-pa-sm">
        Contribution indivduelle des entrées
      </Divider>
      <GainPieChart
        :stock-movements="pInvoice.selected[0].stockMovements"
        :invoice-date="pInvoice.selected[0].createdAt"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import InvoiceList from '../../invoice/InvoiceList.vue';
import { SelectedInvoice } from '../../../pages/invoice/Invoice.vue';
import Gain from './Gain.vue';
import GainPieChart from './GainPieChart.vue';
import Divider from '../../shared/Divider.vue';

export default defineComponent({
  name: 'Income',
  components: { InvoiceList, Gain, GainPieChart, Divider },
  setup() {
    const pInvoice = reactive<SelectedInvoice>({
      selected: [],
      loading: false,
      total: 0
    });
    return {
      pInvoice,
      tab: ref<string>('resume'),
    }
  }
});
</script>

<style scoped>

</style>
