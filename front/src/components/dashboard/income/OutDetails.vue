<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard resizable class="my-card">
      <template v-slot:title>
        Détails du mouvement
        {{getMedicineName(movement.batch.medicine)}}
        Exp.{{formatDate(movement.batch.expirationDate, 'DATE_ONLY')}}
      </template>
      <q-table
        bordered
        square
        :columns="cols"
        row-key="name"
        :rows="movement?.out"
        table-class="text-blue-grey-14"
        :rows-per-page-options="[4, 8, 15, 20]"
        flat
        no-data-label="Aucune vente sur ce lot"
        separator="vertical"
        :pagination-label="getPaginationLabel"
        rows-per-page-label="Lignes par page"
        class="sticky-header-table"
        style="max-height: 100%;"
      >
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
            <q-td>{{formatDate(invoiceDate, 'DATE_TIME')}}</q-td>
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
            <q-td key="date">
              {{formatDate(props.row.sale.createdAt, 'DATE_TIME')}}
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
            <td></td>
          </q-tr>
        </template>
      </q-table>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { columns, lineCost, linesCosts } from './logical';
import { StockMovement } from '../../../graphql/types';
import { getMedicineName } from '../../../graphql/utils/utils';
import { formatDate } from '../../../shared/date';
import UnitConverter from '../../packaging/UnitConverter.vue';
import { useI18n } from 'vue-i18n';
import MovableCard from '../../shared/MovableCard.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'OutDetails',
  components: { MovableCard, UnitConverter },
  props: {
    movement: Object as PropType<StockMovement>,
    invoiceDate: String
  },
  setup() {
    const { t } = useI18n();
    const cols = ['quantity', 'price', ...columns, 'date'].map(col => ({
      name: col,
      label: t('movement.' + col),
      align: 'center'
    }));
    const { dialogRef } = useDialogPluginComponent();
    return {
      cols,
      getMedicineName,
      formatDate,
      linesCosts,
      lineCost,
      dialogRef,
      getPaginationLabel: (firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => {
        return `${firstRowIndex} - ${endRowIndex} de ${totalRowsNumber}`;
      }
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
 .my-card {
   width: 90vw;
 }
</style>
