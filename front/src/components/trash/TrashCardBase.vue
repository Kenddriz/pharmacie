<template>
  <q-card
    style="height: 180px; width: 210px"
    flat
    bordered
    class="column justify-center text-center items-center cursor-pointer text-subtitle1"
    v-ripple
  >
    {{label}}<br>
    <q-spinner v-if="loading" color="warning" size="lg" />
    <span v-else class="q-mt-md">{{total}}</span>
  </q-card>
</template>

<script>
export default {
  name: 'TrashCardBase',
  props: {
    label: String,
    loading: Boolean,
    total: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>

</style>
