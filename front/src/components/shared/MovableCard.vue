<template>
  <q-card
    class="text-blue-grey-14"
    :style="currentPos"
    v-bind:class="{resizable: 'resizable'}"
  >
    <q-bar v-touch-pan.prevent.mouse="move" class="bg-teal-14">
      <div class="text-white">
        <slot name="title"></slot>
      </div>
      <q-space />
      <q-btn v-close-popup dense size="sm" unelevated color="red" icon="close" />
    </q-bar>
    <q-card-section
      style="height: 100%;"
      class="q-pa-sm overflow-auto"
      v-touch-pan.prevent.mouse="move"
    >
      <slot></slot>
    </q-card-section>
    <q-card-actions style="position: fixed" class="absolute-bottom bordered-top q-pa-none">
      <slot name="footer"></slot>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { movable } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'MovableCard',
  props: {
    resizable: Boolean
  },
  setup() {
    return {
      ...movable()
    }
  }
});
</script>

<style scoped>
</style>
