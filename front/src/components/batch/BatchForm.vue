<template>
  <q-form class="q-pa-md q-gutter-sm">
    <q-input outlined dense label="Date de fabrication" />
    <q-input outlined dense label="Date de péremption" />
    <q-input outlined dense label="Quantité" />
    <q-input outlined dense label="Prix unitaire">
      <template v-slot:append>
        <q-btn icon-right="chevron_right" no-caps flat dense label="unit"></q-btn>
      </template>
    </q-input>
  </q-form>
</template>

<script lang="ts">
export default {
  name: 'BatchForm',
};
</script>

<style scoped>

</style>
