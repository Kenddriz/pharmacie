<template>
  <q-tab-panels
    :style="`height:${$q.screen.height - 70}px;`"
    v-model="otherLayoutTab"
    animated
    keep-alive
  >
    <q-tab-panel class="q-pa-none" name="statistics">
      <Counter />
      <div class="row q-col-gutter-md q-px-md q-py-md">
        <div class="col-md-6 col-sm-12 col-xs-12">
          <MedicinesStocks />
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <SaleChart />
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <CommandsMonthlyCpt />
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <MostConsumedMedicines />
        </div>
      </div>
    </q-tab-panel>
    <q-tab-panel name="income" class="q-pa-none">
      <Income />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Counter from '../../components/dashboard/statistics/Counter.vue';
import MedicinesStocks from '../../components/dashboard/statistics/MedicinesStocks.vue';
import SaleChart from '../../components/dashboard/statistics/SaleChart.vue';
import CommandsMonthlyCpt from '../../components/dashboard/statistics/CommandsMonthly.vue';
import MostConsumedMedicines from '../../components/dashboard/statistics/MostConsumedMedicines.vue';
import Income from '../../components/dashboard/income/Income.vue';
import { otherLayoutTab } from '../../layouts/menu';

export default defineComponent({
  name: 'Index',
  components: {
    Counter,
    MedicinesStocks,
    SaleChart,
    CommandsMonthlyCpt,
    MostConsumedMedicines,
    Income
  },
  setup() {
    return {
      otherLayoutTab
    }
  }
})
</script>
