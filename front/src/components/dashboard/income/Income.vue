<template>
  <div class="row q-gutter-x-sm wrap q-pl-md overflow-hidden">
    <InvoiceList
      :height="210"
      class="col-12 col-md-4"
      v-model="pInvoice.selected"
      v-model:total="pInvoice.total"
      v-model:p-loading="pInvoice.loading"
      @update:modelValue="selectedMovement = $event[0]?.stockMovements[0]"
    />
    <q-tab-panels
      v-model="tab"
      animated
      class="col bordered-left"
    >
      <q-tab-panel name="resume" class="q-pt-sm">
        <q-list v-if="pInvoice.selected.length">
          <q-expansion-item
            group="gain"
            icon="explore"
            label="Profit global"
            default-opened
            header-class="text-weight-bold"
          >
            <Gain :invoice="pInvoice.selected[0]" />
          </q-expansion-item>
          <q-expansion-item
            group="gain"
            icon="explore"
            label="Profit individuel"
            header-class="text-weight-bold"
          >
            <div class="flex flex-center q-gutter-x-sm q-pt-sm">
              <MovementTable
                v-for="(item, index) in pInvoice.selected[0].stockMovements"
                :key="index"
                :out-cost="linesCosts(item.out, true)"
                :entry-cost="lineCost(item)"
                :expiration="formatDate(item.batch.expirationDate, 'DATE_ONLY')"
                :medicine="getMedicineName(item.batch.medicine)"
                :quantity="item.quantity"
                @detail="selectedMovement = item; tab = $event"
              />
            </div>
          </q-expansion-item>
        </q-list>
      </q-tab-panel>

      <q-tab-panel name="details" class="q-pa-none">
        <OutDetails
          v-if="selectedMovement"
          :movement="selectedMovement"
          @back="tab = $event"
        />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import InvoiceList from '../../invoice/InvoiceList.vue';
import { SelectedInvoice } from '../../../pages/invoice/Invoice.vue';
import { getMedicineName } from '../../../graphql/utils/utils';
import MovementTable from './MovementTable.vue';
import { formatDate } from '../../../shared/date';
import { linesCosts, lineCost } from './logical';
import OutDetails from './OutDetails.vue';
import { StockMovement } from '../../../graphql/types';
import Gain from './Gain.vue';

export default defineComponent({
  name: 'Income',
  components: { InvoiceList, MovementTable, OutDetails, Gain },
  setup() {
    const pInvoice = reactive<SelectedInvoice>({
      selected: [],
      loading: false,
      total: 0
    });
    const selectedMovement = ref<StockMovement|null>(null);
    return {
      pInvoice,
      getMedicineName,
      formatDate,
      linesCosts,
      lineCost,
      tab: ref<string>('resume'),
      selectedMovement
    }
  }
});
</script>

<style scoped>

</style>
