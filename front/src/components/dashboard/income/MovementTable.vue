<template>
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
                <q-item-label>{{medicine}}</q-item-label>
                <q-item-label caption>
                  exp. {{expiration}}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  @click="$emit('detail', 'details')"
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
      <tr class="q-tr--no-hover">
        <td>Marge</td>
        <td class="text-center" colspan="2">
          {{outCost[4] - entryCost[3]}}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { columns, roundNumber } from './logical';

export default defineComponent({
  name: 'MovementTable',
  props: {
    entryCost: {
      type: Array as PropType<number[]>,
      required: true
    },
    outCost: {
      type: Array as PropType<number[]>,
      required: true
    },
    medicine: String,
    expiration: String,
    quantity: {
      required: true,
      type: Number
    }
  },
  emits: ['detail'],
  setup(props) {
    return {
      columns,
      progress: computed(() => roundNumber(props.outCost[0] * 100 / props.quantity)),
      roundNumber
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
