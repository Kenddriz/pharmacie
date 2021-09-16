<template>
  <q-card square flat>
    <q-card-section :horizontal="$q.screen.gt.sm">
      <q-card-section :class="`justify-between items-center ${$q.screen.gt.sm ? 'column' : 'row'}`">
        <q-input
          :model-value="pcInput.year"
          input-class="text-center"
          placeholder="Année de commande"
          class="q-mb-md"
          dense
          type="number"
          v-model.number="pcInput.year"
          :loading="pcLoading"
          @keydown.enter="refresh"
        >
          <template v-slot:prepend>
            <span class="text-dark text-body2 text-weight-bold">Année : </span>
          </template>
          <template v-slot:append>
            <q-icon
              @click="refresh"
              color="dark"
              name="send"
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-list class="full-width" separator bordered>
          <template v-if="providerCommands.items.length">
            <q-item
              clickable
              v-ripple
              v-for="cmd in providerCommands.items"
              :key="cmd.id"
              @click="openMoreDialog(cmd)"
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
                :model-value="pcInput.page"
                :max="providerCommands.meta.totalPages"
                v-model="pcInput.page"
                @update:model-value="getCommands(provider.id)"
                input
              />
            </q-item>
          </template>
          <q-item v-else>
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
import { defineComponent, PropType, watch, UnwrapRef } from 'vue';
import { formatDate } from '../../shared/date';
import { useProviderCommands, useProviderCommandsChart } from '../../graphql/provider/provider.service';
import { useI18n } from 'vue-i18n';
import { Command, Provider } from '../../graphql/types';

export default defineComponent({
  name: 'ProviderCommands',
  emits: ['more', 'add'],
  components: {
  },
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    },
    expand: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {emit}){
    const { tm } = useI18n();
    const {
      pcLoading,
      getCommands,
      providerCommands,
      pcInput,
      selectedCmd
    } = useProviderCommands();
    const {
      pccLoading,
      loadChart,
      chartSeries
    } = useProviderCommandsChart();
    function refresh() {
      getCommands(props.provider.id);
      loadChart({ year: pcInput.year, providerId: props.provider.id })
    }
    watch<boolean>(() => props.expand, (expanded) => {
      if(expanded && providerCommands.value.items.length === 0) {
        refresh();
      }
    });
    function openMoreDialog(cmd: UnwrapRef<Command> ) {
      Object.assign(selectedCmd.value[0], {...cmd, provider: props.provider });
      emit('more', selectedCmd.value[0]);/**emit selected reference to parent**/
    }
    return {
      refresh,
      pcLoading,
      getCommands,
      providerCommands,
      pcInput,
      selectedCmd,
      formatDate,
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
      pccLoading,
      loadChart,
      chartSeries,
      openMoreDialog
    }
  }
});
</script>

<style scoped>

</style>
