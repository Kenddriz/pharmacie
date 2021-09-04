<template>
  <q-page class="row">
    <q-table
      title="Médicaments et Lots"
      :rows="[]"
      :columns="columns"
      row-key="id"
      selection="multiple"
      v-model:selected="selected"
      :filter="filter"
      class="col my-table q-ma-sm"
      grid
      hide-header
      no-data-label="aucun médicament disponible"
    >
      <template v-slot:top-right>
        <q-input dense debounce="300" v-model="filter" placeholder="Chercher un médicament">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
          :style="props.selected ? 'transform: scale(0.95);' : ''"
        >
          <q-card :class="props.selected ? 'bg-grey-2' : ''">
            <q-card-section>
              <q-checkbox dense v-model="props.selected" :label="props.row.name" />
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>

    </q-table>
    <q-card class="col-12 col-md-5 q-ma-sm" flat bordered square>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        no-caps
      >
        <q-tab icon="shopping_cart" name="mails" :label="`Vente en cours(${selected.length})`" />
        <q-tab icon="shop_two" name="alarms" label="Historique de ventes" />
        <q-tab icon="personal_injury" name="movies" label="Patients" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails">
          <div class="text-h6">Mails</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="alarms">
          <div class="text-h6">Alarms</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="movies">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { columns } from './data';
import { Batch } from '../../graphql/types';

export default defineComponent({
  name: 'Sale',
  setup() {
    return {
      columns,
      selected: ref<Batch[]>([]),
      filter: ref(''),
      tab: ref<string>('mails')
    }
  }
});
</script>

<style lang="sass">
.grid-style-transition
  transition: transform .28s, background-color .28s
.my-table
  border-radius: unset
  border: 1px solid gainsboro
</style>
