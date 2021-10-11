<template>
  <q-item>
    <q-item-section>
      <q-item-label>Unités de vente</q-item-label>
      <q-item-label caption>{{selected.units.map(u => u.label).join(' - ')}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn class="q-pa-xs" size="sm" flat icon="navigate_next">
        <q-menu ref="pk-menu">
          <q-list separator>
            <q-item
              clickable
              v-for="pk in packaging"
              :key="pk.id"
              :active="selected.id === pk.id"
              active-class="text-warning"
              @click="$emit('selected', pk); $refs['pk-menu'].hide()"
            >
              <q-item-section>{{pk.units.map(u => u.label).join(' - ')}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Packaging } from '../../graphql/types';

export default defineComponent({
  name: 'PackagingList',
  props: {
    packaging: Array as PropType<Packaging[]>,
    selected: Object as PropType<Packaging>
  },
  emits: ['selected']
});
</script>

<style scoped>

</style>
