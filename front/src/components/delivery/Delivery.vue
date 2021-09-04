<template>
  <q-page class="q-pa-sm">
    <q-table
      flat
      square
      bordered
      :rows="[]"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      hide-no-data
      separator="cell"
    >

      <template v-slot:top>
        <q-btn no-caps color="positive" outline rounded label="Retour" icon="arrow_back" @click="$emit('back')" />
        <div class="q-table__title q-ml-md">Livraison de commande</div>
      </template>
      <template v-slot:top-row>
        <q-tr>
          <q-td colspan="100%" class="text-amber-7">
            Cocher les lignes assurées et modifier tout ce qu'il faut.
          </q-td>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            v-for="c in columns.slice(0, 2)"
            :key="c.name"
            :props="props"
          >
            {{ props.row[c.name].label }}
          </q-td>
          <q-td
            v-for="c in columns.slice(3)"
            :key="c.name"
            :props="props"
          >
            {{ props.row[c.name] }}
            <q-popup-edit
              :title="c.label"
              label-set="OK"
              label-cancel="Annuler"
              v-model="props.row[c.name]"
              :model-value="props.row[c.name]"
            >
              <q-input
                v-model="props.row[c.name]"
                :model-value="props.row[c.name]"
                dense
                autofocus
              />
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            Lignes assuréés ({{selected.length}})
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { columns } from './data';

export default defineComponent({
  name: 'Delivery',
  emits: ['back'],
  setup() {
    return {
      columns,
      selected: ref([]),
    }
  }
});
</script>

<style scoped>

</style>
