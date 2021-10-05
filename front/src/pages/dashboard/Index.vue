<template>
  <ScrollArea :style="`height:${$q.screen.height - 80}px`">
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
  </ScrollArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import Counter from '../../components/dashboard/Counter.vue';
import MedicinesStocks from '../../components/dashboard/MedicinesStocks.vue';
import SaleChart from '../../components/dashboard/SaleChart.vue';
import CommandsMonthlyCpt from '../../components/dashboard/CommandsMonthly.vue';
import MostConsumedMedicines from '../../components/dashboard/MostConsumedMedicines.vue';

export default defineComponent({
  name: 'Index',
  components: {
    ScrollArea,
    Counter,
    MedicinesStocks,
    SaleChart,
    CommandsMonthlyCpt,
    MostConsumedMedicines,
  },
  data () {
    return {
      loading: true,
      dialog: true,
      colors: [
        'linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)',
        'linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)',
        'linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)',
        'linear-gradient( 135deg, #EE9AE5 10%, #5961F9 100%)'
      ]
    }
  }
})
</script>
