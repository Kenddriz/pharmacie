<template>
  <q-card
    class="resizable-card"
    :style="`${currentPos}`"
  >
    <q-card-section>
      <q-table
        v-touch-pan.prevent.mouse="move"
        bordered
        square
        :columns="cols"
        row-key="name"
        :rows="movement?.out"
        table-class="text-blue-grey-14"
        :rows-per-page-options="[10, 20, 30, 40]"
        flat
        no-data-label="Aucune vente sur ce lot"
        separator="vertical"
        :pagination-label="getPaginationLabel"
        rows-per-page-label="Lignes par page"
        class="sticky-header-table"
        :style="`max-height:${$q.screen.height - 70}px;`"
      >
        <template v-slot:top>
          <div class="row q-gutter-x-lg q-pl-lg text-weight-bold text-blue-grey-14">
            Détails du mouvement
            <q-item-section>
              <q-item-label>
                {{getMedicineName(movement.batch.medicine)}}
              </q-item-label>
              <q-item-label class="text-brown" caption>
                Exp.{{formatDate(movement.batch.expirationDate, 'DATE_ONLY')}}
              </q-item-label>
            </q-item-section>
          </div>
          <q-space />
          <q-btn
            v-close-popup
            icon="close"
            color="red"
            dense
            flat
            round
            no-caps
          />
        </template>
        <template v-slot:top-row>
          <q-tr no-hover>
            <q-td class="bordered-bottom text-weight-bold text-center" colspan="100%">
              Achat
            </q-td>
          </q-tr>
          <q-tr no-hover>
            <q-td>
              <UnitConverter
                :units="movement.batch.medicine.packaging.units"
                :value="movement.quantity"
                :is-q="true"
              />
            </q-td>
            <q-td>
              <UnitConverter
                :units="movement.batch.medicine.packaging.units"
                :value="movement.price"
                :show-value="true"
                :is-q="false"
              />
            </q-td>
            <q-td
              v-for="(cost, index) in lineCost(movement)"
              :key="cols[index + 2].name"
            >
              {{ cost }}
            </q-td>
          </q-tr>
          <q-tr no-hover>
            <q-td
              class="bordered-bottom bordered-top text-weight-bold text-center"
              colspan="100%"
            >
              Vente
            </q-td>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr no-hover :props="props">
            <q-td
              v-for="key in props.cols.slice(0, 2)"
              :key="key.name"
            >
              <UnitConverter
                :units="movement.batch.medicine.packaging.units"
                :value="props.row[key.name]"
                :is-q="key.name === 'quantity'"
              />
            </q-td>
            <q-td
              v-for="(cost, index) in lineCost(props.row)"
              :key="cols[index + 2].name"
            >
              {{ cost }}
            </q-td>
          </q-tr>
        </template>
        <template v-slot:bottom-row>
          <q-tr no-hover v-bind:class="{'last-tr' : movement.out.length > 0}">
            <q-td colspan="2">
              Total
            </q-td>
            <q-td
              v-for="(cost, index) in linesCosts(movement.out)"
              :key="index"
            >
              {{cost}}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { columns, lineCost, linesCosts } from './logical';
import { StockMovement } from '../../../graphql/types';
import { getMedicineName, movable } from '../../../graphql/utils/utils';
import { formatDate } from '../../../shared/date';
import UnitConverter from '../../packaging/UnitConverter.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'OutDetails',
  components: {
    UnitConverter
  },
  props: {
    movement: Object as PropType<StockMovement>
  },
  emits: ['back'],
  setup() {
    const { t } = useI18n();
    const cols = ['quantity', 'price', ...columns].map(col => ({
      name: col,
      label: t('movement.' + col),
      align: 'center'
    }));

    return {
      cols,
      getMedicineName,
      formatDate,
      linesCosts,
      lineCost,
      getPaginationLabel: (firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => {
        return `${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber}`;
      },
      ...movable()
    }
  }
});
</script>

<style lang="scss" scoped>
 td{
    text-align: center;
  }
 .last-tr{
   td{
     border-top: 1px solid gainsboro!important;
     font-weight: bold;
   }
 }
 .resizable-card {
   resize: both;
   overflow: auto;
   width: 80vw;
   max-width: 98vw;
 }
</style>
