<template>
  <q-card square flat bordered class="text-center">
    <q-card-section class="q-pb-none">
      <div class="flex flex-center">
        <span>Référence : {{invoice.reference}}&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <span>Frais divers : {{invoice.expense}}&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <span>Echéance : {{formatDate(invoice.dueDate, 'DATE_ONLY')}}</span>
      </div>
      <q-slider
        :model-value="costs.progress"
        :min="0"
        :max="100"
        :step="1"
        label
        :label-value="`Quantité vendue : ${costs.progress}%`"
        color="positive"
        readonly
        dense
      />
      <!--<q-knob
        show-value
        font-size="12px"
        :model-value="costs.progress"
        size="150px"
        :thickness="0.11"
        color="teal"
        track-color="grey-3"
        class="q-ma-sm"
        readonly
      >
        <div>
          Quantité vendue
          <div class="q-mt-sm">{{ costs.progress }}%</div>
        </div>
      </q-knob>-->
    </q-card-section>
    <q-separator />
    <q-card-section horizontal>
      <q-markup-table
        separator="vertical"
        flat
        class="text-blue-grey-14 col"
      >
        <thead>
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
          <td>{{costs.expense[index]}}</td>
          <td>{{costs.income[index]}}</td>
        </tr>
        </tbody>
      </q-markup-table>
      <q-separator vertical />
      <q-markup-table
        separator="vertical"
        flat
        class="text-blue-grey-14 col"
      >
        <thead>
          <tr>
            <th style="text-align: center!important;" colspan="2">
              Observation de profit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="q-tr--no-hover">
            <td>Prix de revient</td>
            <td>{{costs.expense[3] + invoice.expense}}</td>
          </tr>
          <tr class="q-tr--no-hover">
            <td>Prix de vente</td>
            <td>{{costs.income[3]}}</td>
          </tr>
          <template  v-if="(m = costs.income[3] - costs.expense[3] - invoice.expense) !== undefined">
            <tr class="q-tr--no-hover">
              <td>Marge</td>
              <td :class="m > 0 ? 'text-positive' : 'text-red'">{{m}}</td>
            </tr>
            <tr class="q-tr--no-hover">
              <td colspan="2" class="bordered-top" style="text-align: center!important;">
                <span v-if="m === 0" class="text-amber-10">Résultat nul</span>
                <span v-if="m > 0" class="text-positive">Bénéfice</span>
                <span v-else class="text-negative">Perte</span>
              </td>
            </tr>
          </template>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { Invoice } from '../../../graphql/types';
import { formatDate } from '../../../shared/date';
import { columns, lineCost, linesCosts, roundNumber } from './logical';

export default defineComponent({
  name: 'Gain',
  props:{
    invoice: {
      type: Object as PropType<Invoice>,
      required: true
    }
  },
  setup(props) {
    const costs = computed(() => {
      let expense: number[] = [0, 0, 0, 0];/*ht, vat, discount, ttc**/
      let income: number[] = [0, 0, 0, 0];
      let quantities: number[] = [0, 0]; /**entry quantity and out*/
      props.invoice.stockMovements.forEach(mvt => {
        quantities[0] += mvt.quantity;
        expense = lineCost(mvt).map((cost, index) => cost + expense[index]);
        const out = linesCosts(mvt.out, true);
        quantities[1] += out[0];
        out.splice(0, 1);
        income = out.map((cost, index) => {
          return cost + income[index];
        });
      });
      return { expense, income, progress: roundNumber((quantities[1] * 100) / quantities[0]) }
    })
    return {
      formatDate,
      costs,
      columns
    }
  }
});
</script>

<style scoped>
 th, td { text-align: left; }
 th {  font-weight: bold }
</style>
