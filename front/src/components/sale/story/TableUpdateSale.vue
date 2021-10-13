<template>
  <q-markup-table
    bordered
    separator="vertical"
    flat
    square
    class="text-blue-grey-14 q-mt-sm"
  >
    <thead>
    <tr>
      <th style="border-bottom: 1px solid gainsboro" colspan="8">
        Liste de médicaments achetés ({{ sale.stockMovements.length }})
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
      <td>{{stm.batch.id}}</td>
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
      :disable="!sale.stockMovements.length"
      no-caps
      icon-right="close"
      outline
      color="amber-10"
      label="Annuler toutes lignes"
      @click="cancel"
    >
      <q-tooltip
        class="bg-amber-10 text-body2"
        :offset="[5, 5]"
        transition-show="scale"
        transition-hide="scale"
      >
        <q-icon size="xs" class="q-mr-smd" name="info" />
        {{$t('sale.cancelAll')}}
      </q-tooltip>
    </q-btn>
    <q-btn
      no-caps
      icon="delete"
      outline
      color="red"
      label="Supprimer cette vente"
      @click="softRemoveSale(sale.id)"
      v-close-popup
    />
  </q-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CommonSaleHeader from '../CommonSaleHeader.vue';
import UnitConverter from '../../packaging/UnitConverter.vue';
import { Sale, StockMovement } from '../../../graphql/types';
import { useQuasar } from 'quasar';
import { useCancelSaleLines } from '../../../graphql/stock-movement/stock-mvt.service';
import { getMedicineName, saleLineCost } from '../../../graphql/utils/utils';
import UpdateSaleLine from '../../stock-movement/UpdateSaleLine.vue';
import AddSaleLine from '../../stock-movement/AddSaleLine.vue';
import { useSoftRemoveSale } from '../../../graphql/sale/sale.service';

export default defineComponent({
  name: 'TableUpdateSale',
  components: { CommonSaleHeader, UnitConverter },
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
          componentProps: {
            saleId: props.sale.id,
            existingIds: props.sale.stockMovements.map(s => s.batch.id)
          }
        })
      },
      ...useSoftRemoveSale()
    }
  }
});
</script>

<style lang="scss" scoped>
td{text-align: center}
</style>
