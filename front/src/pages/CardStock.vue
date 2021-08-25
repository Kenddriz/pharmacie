<template>
  <q-markup-table separator="cell" class="q-ma-sm" flat bordered>
    <thead>
    <tr>
      <th colspan="2">
        <div class="text-h4">FICHE DE STOCK</div>
      </th>
      <th colspan="4">
        <q-form class="q-pt-sm">
          <div class="q-gutter-md">
            <q-radio dense val="month" label="Mois" />
            <q-radio dense val="date" label="Date précise" />
            <q-radio dense val="year" label="Toute l'année" />
          </div>
          <q-input dense>
            <template v-slot:after>
              <q-btn icon="search" type="submit" />
            </template>
          </q-input>
        </q-form>
      </th>
    </tr>
    <tr>
      <th colspan="3">Article : Paracétamol</th>
      <th colspan="3">Dosage/Forme : 200mg, comprimé</th>
    </tr>
    <tr>
      <th colspan="3">Code: M1</th>
      <th colspan="3">Unités de conditionnement : Boîte de 100 - 100plauettes</th>
    </tr>
    <tr>
      <th>DATE</th>
      <th>ORIGINE/DESTINATION</th>
      <th>ENTREE</th>
      <th>SORTIE</th>
      <th>STOCK</th>
      <th>REMARQUES</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td class="text-center">Frozen Yogurt</td>
      <td class="text-center">159</td>
      <td class="text-center">6</td>
      <td class="text-center">24</td>
      <td class="text-center">4</td>
      <td class="text-center">87</td>
    </tr>
    <tr>
      <td class="text-center">Ice cream sandwich</td>
      <td class="text-center">237</td>
      <td class="text-center">9</td>
      <td class="text-center">37</td>
      <td class="text-center">4.3</td>
      <td class="text-center">129</td>
    </tr>
    <tr>
      <td class="text-center">Eclair</td>
      <td class="text-center">262</td>
      <td class="text-center">16</td>
      <td class="text-center">23</td>
      <td class="text-center">6</td>
      <td class="text-center">337</td>
    </tr>
    <tr>
      <td class="text-center">Cupcake</td>
      <td class="text-center">305</td>
      <td class="text-center">3.7</td>
      <td class="text-center">67</td>
      <td class="text-center">4.3</td>
      <td class="text-center">413</td>
    </tr>
    <tr>
      <td class="text-center">Gingerbread</td>
      <td class="text-center">356</td>
      <td class="text-center">16</td>
      <td class="text-center">49</td>
      <td class="text-center">3.9</td>
      <td class="text-center">327</td>
    </tr>
    </tbody>
  </q-markup-table>
  <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="current"
      color="purple"
      :max="10"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'stockMovement',
  setup () {
    return {
      current: ref(6)
    }
  }
});
</script>

<style lang="scss" scoped>
  th {
    font-weight: bolder;
  }
</style>
