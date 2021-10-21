<template>
  <q-markup-table
    flat
    bordered
    class="text-blue-grey-14"
    style="height: 300px"
    separator="none"
  >
    <thead>
      <tr>
        <th colspan="2">
          <span class="text-subtitle2 text-weight-bold">
            Les médicaments les plus consomés
          </span>
          <q-spinner-dots v-if="loading" color="primary" size="sm" />
        </th>
      </tr>
      <tr>
        <th class="text-left">Médicament</th>
        <th class="text-left">Nombre d'achat</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(med, index) in consumed" :key="index">
        <td>{{getMedicineName(med.medicine)}}</td>
        <td>{{med.count}}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMostConsumedMedicines } from '../../../graphql/medicine/medicine.service';
import { getMedicineName } from '../../../graphql/utils/utils';

export default defineComponent({
  name: 'MostConsumedMedicines',
  setup() {
    return {
      ...useMostConsumedMedicines(),
      getMedicineName
    }
  }
});
</script>

<style lang="scss" scoped>
  th {
    font-weight: bold;
  }
</style>
