<template>
  <q-item>
    <q-item-section>
      <q-item-label>Dosage</q-item-label>
      <q-item-label caption>{{selected.label}}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-btn class="q-pa-xs" size="sm" flat icon="navigate_next">
        <q-menu ref="dosage-menu">
          <q-list dense>
            <template v-for="(parent, index) in dosages" :key="index">
              <q-item-label header>{{parent.label}}</q-item-label>

              <q-item
                v-for="child of parent.children"
                :key="child.id"
                clickable
                v-ripple
                :active="selected.id === child.id"
                active-class="text-warning"
                @click="$emit('selected', child); $refs['dosage-menu'].hide()"
              >
                <q-item-section>
                  {{child.label}}
                </q-item-section>
              </q-item>
              <q-separator v-if="dosages[index + 1]" spaced />
            </template>
          </q-list>
        </q-menu>
      </q-btn>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DosageItem } from '../../graphql/dosage/dosage.service';

export default defineComponent({
  name: 'DosageList',
  props: {
    dosages: Array as PropType<DosageItem[]>,
    selected: Object as PropType<DosageItem>
  },
  setup() {
    return {

    }
  }

});
</script>

<style scoped>

</style>
