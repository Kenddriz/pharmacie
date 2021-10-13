<template>
  <q-inner-loading :showing="!totalItems && !loading">
    <img  src="no-data.svg" height="250" width="250" />
    <div class="absolute-center text-h5">Aucune donnée</div>
  </q-inner-loading>
  <q-inner-loading :showing="loading">
    <q-spinner-cube color="warning" size="80px" />
  </q-inner-loading>
</template>

<script>
export default {
  name: 'NoTrashData',
  props: {
    loading: Boolean,
    totalItems: Number
  }
};
</script>

<style scoped>

</style>
