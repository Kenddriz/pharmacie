<template>
  <q-scroll-area
    :thumb-style="thumbStyle"
    :bar-style="barStyle"
  >
    <slot></slot>
  </q-scroll-area>
</template>

<script lang="ts">
export default {
  name: 'ScrollArea',
  setup() {
    return {
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },

      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      }
    }
  }
};
</script>

<style scoped>

</style>
