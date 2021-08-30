<template>
  <tr>
    <td colspan="7">
      <!--@click="addAddCmdLine"-->
      <q-btn
        label="Nouvelle ligne"
        class="q-mr-md"
        color="primary"
        icon="add"
        no-caps
      />
      <!-- v-if="input.commandLines.length"-->
      <q-btn
        no-caps
        outline
        color="primary"
        label="Enregistrer les lignes"
        icon-right="save"
      />
    </td>
  </tr>
  <tr v-for="(ipt, i) in [1, 2, 3]" :key="i">
    <td>
      <Autocomplete
        borderless
        style="min-width: 150px"
        :options="medicines"
      />
    </td>
    <td>Forme</td>
    <td>Dosage</td>
    <td>
      <q-input
        borderless
        style="min-width: 100px"
        min="0"
        type="number"
        dense
      >
      <template v-slot:after>
        <q-btn class="q-pr-md q-pl-md" flat dense no-caps label="unité d'achat">

        </q-btn>
      </template>
      </q-input>
    </td>
    <td>
      <q-btn
        icon="delete"
        round
        unelevated
        dense
        text-color="orange"
      />
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Medicine } from '../../graphql/types';
import Autocomplete from '../shared/Autocomplete.vue';

export default defineComponent({
  name: 'CommandLineRow',
  components: {Autocomplete},
  emits: ['submitted'],
  setup() {
    return {
      medicines: ref<Medicine[]>([])
    }
  },
});
</script>
