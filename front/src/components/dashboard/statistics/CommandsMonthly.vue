<template>
  <q-card style="height: 300px" flat bordered>
    <q-card-section>
      <apexchart
        type="line"
        height="250px"
        :options="chartOptions"
        :series="chartSeries"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useCommandsMonthly } from '../../../graphql/command/command.service';

export default defineComponent({
  name: 'CommandsMonthly',
  setup() {
    const { tm } = useI18n();
    return {
      chartOptions: {
        chart: {
          toolbar: {
            show: false
          },
        },
        title: {
          text: 'Nombre de Commandes Passées & Livrées',
          align: 'center',
          style: {
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            color:  '#455a64'
          }
        },
        stroke: {
          width: [0, 4]
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1]
        },
        labels: tm('local.monthsShort'),
        legend: {
          show: true,
          fontFamily: 'Poppins, sans-serif',
          color:  '#455a64',
          labels: {}
        },
        yaxis: {
          title: {
            text: 'Nombre',
            style: {
              fontFamily: 'Poppins, sans-serif',
              color:  '#455a64'
            }
          },
          labels: {
            formatter: function(val: number) {
              return val.toFixed(0);
            },
          }

        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: 'Poppins, sans-serif',
              color:  '#455a64',
            },
          }
        },
        tooltip: {
          style: {
            fontSize: '12px',
            fontFamily: 'Poppins, sans-serif',
          },
        }
      },
      ...useCommandsMonthly()
    }
  }
});
</script>

<style scoped>

</style>
