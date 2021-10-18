<template>
  <q-card class="text-blue-grey-14" square flat>
    <q-card-section :horizontal="$q.screen.gt.sm">
      <q-card-section
        :class="`justify-between items-center ${$q.screen.gt.sm ? 'column' : 'row'}`"
        style="width: 300px;"
      >
        <q-input
          :model-value="chartInput.year"
          input-class="text-center"
          placeholder="Année de commande"
          class="q-mb-md"
          dense
          type="number"
          :loading="pcLoading"
          v-model.number="chartInput.year"
          @keydown.enter="input.providerInput.year = chartInput.year"
        >
          <template v-slot:prepend>
            <span class="text-body2 text-weight-bold">Année : </span>
          </template>
          <template v-slot:append>
            <q-icon
              @click="input.providerInput.year = chartInput.year"
              color="dark"
              name="send"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-list class="full-width" separator bordered>
          <template v-if="commands.items.length">
            <q-item
              clickable
              v-ripple
              v-for="(cmd, index) in commands.items"
              :key="index"
              @click="showMore(index)"
            >
              <q-item-section side>
                N°{{cmd.id}}
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  Date [livrée : <span class="text-secondary">{{cmd.invoice ? 'oui' : 'non'}}</span>]
                </q-item-label>
                <q-item-label caption lines="1">
                  {{formatDate(cmd.createdAt, 'DATE_ONLY')}}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="read_more" color="green" />
              </q-item-section>
            </q-item>
            <q-item>
              <q-pagination
                :model-value="input.page"
                :max="commands.meta.totalPages"
                v-model="input.page"
                input
              />
            </q-item>
          </template>
          <q-item v-else-if="!pcLoading">
            <q-item-section class="text-red text-center">
              Aucune commande
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn
          class="full-width"
          icon="add"
          no-caps
          flat
          color="brown"
          label="commande"
          @click="$emit('add')"
        />
      </q-card-section>
      <q-separator :vertical="$q.screen.gt.sm" />
      <q-card-section class="col">
        <apexchart
          type="line"
          height="230px"
          :options="chartOptions"
          :series="chartSeries"
        />
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formatDate } from '../../shared/date';
import { useProviderCommandsChart } from '../../graphql/provider/provider.service';
import { useI18n } from 'vue-i18n';
import { usePaginateCommands } from '../../graphql/command/command.service';

export default defineComponent({
  name: 'ProviderCommands',
  emits: ['more', 'add'],
  components: {
  },
  props: {
    providerId: {
      type: Number,
      required: true
    }
  },
  setup(props, {emit}){
    const { tm } = useI18n();
    const { pccLoading, chartSeries, input: chartInput } = useProviderCommandsChart(props.providerId);
    const { commands, selectedCmd, setSelectedCmd, pcLoading, input } = usePaginateCommands(1, chartInput);
    function showMore(index: number) {
      setSelectedCmd(index);
      emit('more', selectedCmd.value[0]);/**emit selected reference to parent**/
    }
    return {
      commands,
      selectedCmd,
      pcLoading,
      input,
      showMore,
      formatDate,
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
      pccLoading,
      chartSeries,
      chartInput
    }
  },
});
</script>

<style scoped>

</style>
