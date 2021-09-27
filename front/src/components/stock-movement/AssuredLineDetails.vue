<template>
  <InvoiceDetails :invoice="invoice" />
  <q-table
    :title="`Lignes livrées : ${invoice.stockMovements.length * 100/commandLines.length}%`"
    flat
    square
    bordered
    hide-pagination
    :rows="invoice.stockMovements"
    :columns="assuredLineColumns"
    row-key="id"
    separator="vertical"
    table-class="text-blue-grey-14"
    title-class="text-blue-grey-14"
  >
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="batch" no-hover>
          {{ props.row.batch.medicine.article.commercialName }}
          {{ props.row.batch.medicine.dosage.label }}
          , {{ props.row.batch.medicine.form.label }}
        </q-td>
        <q-td key="commandedQuantity">
          <UnitConverter
            class="text-caption"
            :value="commandedQ(props.row.batch.medicine.id)"
            :units="props.row.batch.medicine.packaging.units"
            :is-q="true"
          />
        </q-td>
        <q-td key="deliveredQuantity">
          <UnitConverter
            class="text-caption"
            :value="props.row.quantity"
            :units="props.row.batch.medicine.packaging.units"
            :is-q="true"
          />
        </q-td>
        <q-td key="price">
          <UnitConverter
            class="text-caption"
            :value="props.row.price"
            :units="props.row.batch.medicine.packaging.units"
            :is-q="false"
          />
        </q-td>
        <q-td key="ht">
          {{props.row.quantity * props.row.price }}
        </q-td>
        <q-td key="discount">
          {{props.row.discount}}%
        </q-td>
        <q-td key="vat">
          {{props.row.vat}}%
        </q-td>
        <q-td key="expirationDate">
          {{formatDate(props.row.batch.expirationDate, 'DATE_ONLY')}}
          <q-btn
            @click="openDialog(props.row)"
            icon="edit"
            flat
            round
            size="sm"
            color="positive"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog
    v-if="dialog.selected.length"
    square
    full-width
    full-height
    v-model="dialog.open"
  >
    <UpdateAssuredLine :stm="dialog.selected[0]" />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { CommandLine, Invoice, StockMovement } from '../../graphql/types';
import UnitConverter from '../packaging/UnitConverter.vue';
import { assuredLineColumns } from './data';
import InvoiceDetails from '../invoice/InvoiceDetails.vue';
import { formatDate } from '../../shared/date';
import UpdateAssuredLine from './UpdateAssuredLine.vue';

export default defineComponent({
  name: 'AssuredLineDetails',
  components: { UnitConverter, InvoiceDetails, UpdateAssuredLine },
  props: {
    commandLines: {
      type: Array as PropType<CommandLine[]>,
      required: true
    },
    invoice: {
      type: Object as PropType<Invoice>,
      required: true
    }
  },
  setup(props) {
    const dialog = reactive<{open: boolean; selected: StockMovement[]}>({
      open: false,
      selected: []
    });
    function openDialog(mvt: StockMovement) {
      dialog.selected = [mvt];
      dialog.open = true;
    }
    return {
      openDialog,
      dialog,
      assuredLineColumns,
      formatDate,
      commandedQ: (medId: number) => {
        return props.commandLines.find(cl => cl.medicine.id === medId)?.quantity||0;
      }
    }
  }
});
</script>

<style scoped>

</style>
