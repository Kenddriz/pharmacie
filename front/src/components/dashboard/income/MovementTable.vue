<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard resizable>
      <q-markup-table
        separator="vertical"
        bordered
        flat
        class="text-blue-grey-14"
      >
        <thead>
        <tr>
          <th colspan="3" style="border-bottom: 1px solid gainsboro">
            <q-list dense>
              <q-item class="q-pa-none">
                <q-item-section class="text-left">
                  <q-item-label>{{getMedicineName(stockMovement.batch.medicine)}}</q-item-label>
                  <q-item-label caption>
                    exp. {{formatDate(stockMovement.batch.expirationDate, 'DATE_ONLY')}}
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn
                    @click="$emit('ok', stockMovement)"
                    flat
                    round
                    icon="read_more"
                    dense
                    color="primary"
                  />
                </q-item-section>
              </q-item>
              <q-slider
                :model-value="progress"
                :min="0"
                :max="100"
                :step="1"
                label
                :label-value="`Quantité vendue : ${progress}%`"
                color="positive"
                readonly
                dense
              />
            </q-list>
          </th>
        </tr>
        <tr>
          <th class="text-left">Libellé</th>
          <th class="text-left">Achat</th>
          <th class="text-left">Vente</th>
        </tr>
        </thead>
        <tbody>
        <tr
          class="q-tr--no-hover"
          v-for="(p, index) in columns"
          :key="index"
        >
          <td>{{$t('movement.' + p)}}</td>
          <td>{{entryCost[index]}}</td>
          <td>{{outCost[index + 1]}}</td>
        </tr>
        <tr v-if="(m = outCost[4] - entryCost[3]) !== undefined" class="q-tr--no-hover">
          <td>Marge</td>
          <td :class="`text-center ${m >= 0 ? 'text-positive' : 'text-red'}`" colspan="2">{{m}}</td>
        </tr>
        </tbody>
      </q-markup-table>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { columns, lineCost, linesCosts, roundNumber } from './logical';
import { StockMovement } from '../../../graphql/types';
import { getMedicineName } from '../../../graphql/utils/utils';
import { formatDate } from '../../../shared/date';
import MovableCard from '../../shared/MovableCard.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'MovementTable',
  components: { MovableCard },
  props: {
    stockMovement: {
      type: Object as PropType<StockMovement>,
      required: true
    }
  },
  emits: ['ok'],
  setup(props) {
    const outCost = linesCosts(props.stockMovement.out, true);
    const { dialogRef } = useDialogPluginComponent();
    return {
      columns,
      getMedicineName,
      formatDate,
      outCost,
      entryCost: lineCost(props.stockMovement),
      progress: computed(() => roundNumber(outCost[0] * 100 / props.stockMovement.quantity)),
      roundNumber,
      dialogRef
    }
  }
});
</script>

<style lang="scss" scoped>
  tr:nth-child(5){
    td {
      border-top: 1px solid gainsboro;
      border-bottom: 1px solid gainsboro;
    }
  }
</style>
