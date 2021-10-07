<template>
  <q-card class="fit q-pt-sm" style="height: 300px" flat bordered>
    <apexchart
      type="line"
      height="200px"
      :options="salesData.salesOptions"
      :series="salesData.salesSeries"
    />
    <q-separator />
    <q-card-actions align="around">
      <q-btn
        @click="currentChoice = 1"
        no-caps
        icon-right="show_chart"
        label="Semaine Dernière"
        v-bind:class="{ 'text-primary': currentChoice, 'text-secondary': !currentChoice }"
        flat
      />
      <q-spinner-dots
        v-if="loading"
        color="primary"
        size="1.2em"
      />
      <q-btn
        @click="currentChoice = 0"
        no-caps
        icon="show_chart"
        label="Semaine Actuelle"
        v-bind:class="{ 'text-primary': !currentChoice, 'text-secondary': currentChoice }"
        flat
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useCount2LatestWeekSales } from '../../graphql/sale/sale.service';
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
