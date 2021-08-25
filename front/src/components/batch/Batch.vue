<template>
  <div class="q-pa-md">
    <div class="q-table__title q-mb-md">
      Lots
      <q-btn class="q-ml-lg" round color="positive" size="sm" glossy icon="add">
        <q-menu>
          <BatchForm />
        </q-menu>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import BatchForm from './BatchForm.vue';
export default {
  name: 'Batch',
  components: { BatchForm }
};
</script>

<style scoped>

</style>
