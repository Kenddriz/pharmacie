<template>
  <q-form class="q-pa-md q-gutter-sm">
    <q-input outlined dense label="Date de fabrication" />
    <q-input outlined dense label="Date de péremption" />
    <q-input outlined dense label="Quantité" />
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'BatchForm',
};
</script>

<style scoped>

</style>
