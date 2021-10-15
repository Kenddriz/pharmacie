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
          align: 'left',
          style: {

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
          labels: {
          }
        },
        yaxis: {
          title: {
            text: 'Nombre',
            style: {
            }
          },
          labels: {
            formatter: function(val: number) {
              return val.toFixed(0);
            },
          }
        }
      },
      ...useCommandsMonthly()
    }
  }
});
</script>

<style scoped>

</style>
