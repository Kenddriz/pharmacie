<template>
  <q-list>
    <q-expansion-item
      group="group"
      :label="`Détails de la facture [${invoice.reference}]`"
      default-opened
      header-class="text-subtitle2"
    >
      <InvoiceDetails :invoice="invoice" />
    </q-expansion-item>
    <q-expansion-item
      group="group"
      :label="`Lignes livrées : ${invoice.stockMovements.length * 100/commandLines.length}%`"
      header-class="text-subtitle2"
    >
      <q-table
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
          <q-tr no-hover :props="props">
            <q-td key="batch" no-hover>
              {{ getMedicineName(props.row.batch.medicine) }}
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
                @click="updateAssuredLine(props.row)"
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
    </q-expansion-item>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CommandLine, Invoice, StockMovement } from '../../graphql/types';
import UnitConverter from '../packaging/UnitConverter.vue';
import { assuredLineColumns } from './data';
import InvoiceDetails from '../invoice/InvoiceDetails.vue';
import { formatDate } from '../../shared/date';
import UpdateAssuredLine from './UpdateAssuredLine.vue';
import { getMedicineName } from '../../graphql/utils/utils';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'AssuredLineDetails',
  components: { UnitConverter, InvoiceDetails },
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
    const { dialog } = useQuasar();
    return {
      assuredLineColumns,
      formatDate,
      getMedicineName,
      commandedQ: (medId: number) => {
        return props.commandLines.find(cl => cl.medicine.id === medId)?.quantity||0;
      },
      updateAssuredLine: (stm: StockMovement) => {
        dialog({
          component: UpdateAssuredLine,
          componentProps: { stm }
        })
      }
    }
  }
});
</script>

<style scoped>

</style>
