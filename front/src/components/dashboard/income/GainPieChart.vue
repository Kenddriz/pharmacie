<template>
  <apexchart
    type="donut"
    height="250"
    :options="chart.options"
    :series="chart.series"
    @legendClick="legendClick"
  >
  </apexchart>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { StockMovement } from '../../../graphql/types';
import { getMedicineName, saleLineCost } from '../../../graphql/utils/utils';
import { useQuasar } from 'quasar';
import MovementTable from './MovementTable.vue';
import OutDetails from './OutDetails.vue';

export default defineComponent({
  name: 'GainPieChart',
  props: {
    stockMovements: {
      type: Array as PropType<StockMovement[]>,
      required: true
    },
    invoiceDate: {
      type: String,
      required: true
    }
  },
  setup(props){
    const chartOptions = {
      chart: {
        type: 'donut',
          toolbar: {
          show: false
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 1000
      },
      plotOptions: {
        pie: {
          donut: {
            background: 'transparent',
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '15px',
                fontFamily: 'Poppins',
                fontWeight: 600,
                color: '#455a64',
                formatter: function (val: string) {
                  return val === 'Total' ? val : '' ;
                },
              },
              value: {
                show: true,
                fontSize: '15px',
                fontFamily: 'Poppins',
                fontWeight: 400,
                color: '#455a64',
                offsetY: 2,
                formatter: function (val: any) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: true,
                label: 'Total',
                fontSize: '15px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 100,
                color: '#455a64',
                formatter: function (w: any) {
                  return w.globals.seriesTotals.reduce(
                    (a: number, b: number) => {
                      return a + b;
                    },
                    0
                  );
                },
              },
            },
          },
        },
      },
      fill: {
        type: 'gradient',
      },
      responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 250
        },
        legend: {
          position: 'bottom',
        }
      }
    }],
      legend: {
        fontFamily: 'Poppins, sans-serif',
        color:  '#455a64',
    },
      tooltip: {
        style: {
          fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
        },
      }
    }
    const chart = computed(() => {
      const labels: string[] = [];
      const indexes: number[] = [];
      const series = props.stockMovements.map((entry, index) => {
        indexes.push(index);
        labels.push(getMedicineName(entry.batch.medicine));
        return entry.out.reduce((cost, cur) => cost + saleLineCost(cur),0);
      });
      return { options: {...chartOptions, labels }, series, indexes }
    });
    const { dialog } = useQuasar();
    return {
      chart,
      legendClick: (chart: any, seriesIndex: number) => {
        dialog({
          component: MovementTable,
          componentProps: { stockMovement: props.stockMovements[seriesIndex] }
        }).onOk((movement: StockMovement) => {
          dialog({
            component: OutDetails,
            componentProps: { movement, invoiceDate: props.invoiceDate }
          })
        })
      }
    }
  }
})
</script>
