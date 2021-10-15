<template>
  <q-card class="fit q-pt-sm" style="height: 300px" flat bordered>
    <q-card-actions v-if="loading" align="around">
      <q-spinner-dots
        color="primary"
        size="1.2em"
      />
    </q-card-actions>
    <apexchart
      type="line"
      height="250px"
      :options="salesData.salesOptions"
      :series="salesData.salesSeries"
    />
  </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useCount2LatestWeekSales } from '../../../graphql/sale/sale.service';
  export default defineComponent({
    name: 'SaleChart',
    setup() {
      return {
        ...useCount2LatestWeekSales()
      }
    }
  })
</script>

<style scoped>

</style>
