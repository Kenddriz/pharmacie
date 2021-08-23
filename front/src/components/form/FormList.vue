<template>
  <q-item>
    <q-item-section>
      <q-item-label>Forme</q-item-label>
      <q-item-label caption>{{selected.label}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn class="q-pa-xs" size="sm" flat icon="navigate_next">
        <q-menu ref="form-menu">
          <q-list separator>
            <q-item
              clickable
              v-for="fm in forms"
              :key="fm.id"
              :active="selected.id === fm.id"
              active-class="text-warning"
              @click="$emit('selected', fm); $refs['form-menu'].hide()"
            >
              <q-item-section>{{fm.label}}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Form } from '../../graphql/types';

export default defineComponent({
  name: 'FormList',
  props: {
    forms: Array as PropType<Form[]>,
    selected: Object as PropType<Form>
  },
  emits: ['selected']
});
</script>

<style scoped>

</style>
