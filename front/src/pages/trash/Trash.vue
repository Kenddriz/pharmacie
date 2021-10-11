<template>
  <q-page class="row q-pa-md justify-center items-center">
    <div style="max-height: 93vh" class="row justify-between overflow-auto q-gutter-md">
      <ProviderTrash />
      <MedicineTrash />
      <PackagingTrash />
      <BatchTrash />
      <CommandTrash />
      <CommandLineTrash />
      <SaleTrash />
      <SaleLineTrash />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProviderTrash from '../../components/trash/ProviderTrash.vue';
import MedicineTrash from '../../components/trash/MedicineTrash.vue';
import PackagingTrash from '../../components/trash/PackagingTrash.vue';
import CommandTrash from '../../components/trash/CommandTrash.vue';
import CommandLineTrash from '../../components/trash/CommandLineTrash.vue';
import BatchTrash from '../../components/trash/BatchTrash.vue';
import SaleTrash from '../../components/trash/SaleTrash.vue';
import SaleLineTrash from '../../components/trash/SaleLineTrash.vue';

export default defineComponent({
  name: 'Trash',
  components: {
    MedicineTrash,
    PackagingTrash,
    ProviderTrash,
    BatchTrash,
    SaleTrash,
    SaleLineTrash,
    CommandTrash,
    CommandLineTrash
  }
});
</script>

<style scoped>

</style>
