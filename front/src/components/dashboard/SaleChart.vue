<template>
  <q-card class="fit" style="height: 300px" flat bordered>
    <q-card-section>
      <q-spinner-dots
        v-if="loading"
        color="primary"
        size="1.2em"
      />
      <apexchart
        type="line"
        height="200px"
        :options="defaultLineOptions"
        :series="salesData.salesSeries"
      />
    </q-card-section>

    <q-separator />

    <q-card-actions align="around">
      <q-btn
        @click="currentChoice = 0"
        no-caps
        icon="show_chart"
        label="Semaine Actuelle"
        v-bind:class="{ 'text-primary': !currentChoice, 'text-secondary': currentChoice }"
        flat
      />
      <q-btn
        @click="currentChoice = 1"
        no-caps
        icon-right="show_chart"
        label="Semaine Dernière"
        v-bind:class="{ 'text-primary': currentChoice, 'text-secondary': !currentChoice }"
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
      const defaultLineOptions = {
        colors: ['#FCCF31', '#17ead9', '#f02fc2'],
        animations: {
          enabled: true,
            easing: 'easeinout',
            speed: 1000
        },
        chart: {
          type: 'line',
          toolbar: { show: false}
        },
        grid: {
          show: true,
            strokeDashArray: 0,
            xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Vente de la semaine',
            align: 'left',
            style: {
            color: '#455a64'
          }
        },
        xaxis: {
          categories: [],
            labels: {
            style: {
              colors: '#455a64'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function(val: number) {
              return val.toFixed(0);
            },
            style: {
              colors: '#455a64'
            }
          }
        }
      }
      return {
        defaultLineOptions,
        ...useCount2LatestWeekSales(defaultLineOptions)
      }
    }
  })
</script>

<style scoped>

</style>
