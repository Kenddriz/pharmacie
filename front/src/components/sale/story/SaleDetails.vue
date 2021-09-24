<template>
  <q-card bordered flat square>
    <UpdatePrescription :sale-id="sale.id" :prescription="sale.prescription" />
    <q-card-section class="q-pa-sm">
      <q-markup-table
        bordered
        separator="vertical"
        flat
        square
        class="text-blue-grey-14"
      >
        <thead>
        <tr>
          <th style="border-bottom: 1px solid gainsboro" colspan="8">
            Liste de médicaments achetés
          </th>
        </tr>
        <CommonSaleHeader>
          <q-icon name="more_vert" size="sm" color="positive" />
        </CommonSaleHeader>
        </thead>
        <tbody>
        <tr
          v-for="(stm, index) in sale.stockMovements"
          :key="index"
          class="q-tr--no-hover"
        >
          <td>{{index + 1}}</td>
          <td>{{getMedicineName(stm.batch.medicine)}}</td>
          <td>
            <UnitConverter
              :value="stm.price"
              :units="stm.batch.medicine.packaging.units"
              :is-q="false"
            />
          </td>
          <td>{{stm.vat}}</td>
          <td>{{stm.discount}}</td>
          <td>
            <UnitConverter
              :units="stm.batch.medicine.packaging.units"
              :value="stm.quantity"
              :is-q="true"
            />
          </td>
          <td>{{saleLineCost(stm)}}</td>
          <td width="50">
            <q-btn
              round
              flat
              dense
              size="sm"
              icon="more_vert"
              color="positive"
              @click="updateSaleLine(stm)"
            />
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
    <q-card-actions align="around">
      <q-btn
        no-caps
        icon="add"
        outline
        color="primary"
        label="Nouvelles lignes de vente"
        @click="addSaleLine"
      />
      <q-btn
        no-caps
        icon="delete"
        outline
        color="red"
        label="Supprimer cette vente"
      />
      <q-btn
        :disable="!sale.stockMovements.length"
        no-caps
        icon-right="close"
        outline
        color="brown"
        label="Annuler cette vente"
        @click="cancel"
      >
        <q-tooltip
          class="bg-brown text-body2"
          :offset="[5, 5]"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-icon size="xs" class="q-mr-smd" name="info" />
          {{$t('sale.cancelAll')}}
        </q-tooltip>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CommonSaleHeader from '../CommonSaleHeader.vue';
import { Sale, StockMovement } from '../../../graphql/types';
import UnitConverter from '../../packaging/UnitConverter.vue';
import UpdatePrescription from '../../prescription/UpdatePrescription.vue';
import { getMedicineName, saleLineCost } from '../../../graphql/utils/utils';
import { useQuasar } from 'quasar';
import UpdateSaleLine from '../../stock-movement/UpdateSaleLine.vue';
import { useCancelSaleLines } from '../../../graphql/stock-movement/stock-mvt.service';
import AddSaleLine from '../../stock-movement/AddSaleLine.vue';

export default defineComponent({
  name: 'SaleDetails',
  components: { CommonSaleHeader, UnitConverter, UpdatePrescription },
  props: {
    sale: {
      type: Object as PropType<Sale>,
      required: true
    }
  },
  setup(props) {
    const { dialog } = useQuasar();
    const { cancelSaleLine } = useCancelSaleLines();
    function cancel() {
      cancelSaleLine({
        saleId: props.sale.id,
        saleLineIds: props.sale.stockMovements.map(m => m.id)
      })
    }
    return {
      getMedicineName,
      saleLineCost,
      updateSaleLine: (stm: StockMovement) => {
        dialog({
          component: UpdateSaleLine,
          componentProps: { stm, saleId: props.sale.id }
        })
      },
      cancel,
      addSaleLine: () => {
        dialog({
          component: AddSaleLine,
          componentProps: { saleId: props.sale.id }
        })
      }
    }
  }
});
</script>

<style scoped>

</style>
