<template>
  <div
    :style="`height: ${sizes[0]}%`"
    class="row justify-center items-center"
    v-if="totalItems === 0 && !loading"
  >
    <span>
      <img  src="no-data.svg" :height="sizes[1]" :width="sizes[1]" />
      <slot v-if="$slots.default"></slot>
      <div v-else class="text-subtitle1">Aucune donnée</div>
    </span>
  </div>
  <q-inner-loading :showing="loading">
    <q-spinner-cube color="warning" size="80px" />
  </q-inner-loading>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    loading: Boolean,
    totalItems: Number,
    sizes: {
      type: Array,
      default: () => ([100, 250])
    }
  }
};
</script>

<style scoped>

</style>
