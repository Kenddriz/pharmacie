<template>
  <q-page class="row q-pa-md justify-center items-center">
    <div style="max-height: 93vh" class="row justify-between overflow-auto q-gutter-md">
      <ProviderTrash />
      <ArticleTrash />
      <MedicineTrash />
      <PackagingTrash />
      <BatchTrash />
      <CommandTrash />
      <InvoiceTrash />
      <SaleTrash />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProviderTrash from '../../components/trash/ProviderTrash.vue';
import ArticleTrash from '../../components/trash/ArticleTrash.vue';
import MedicineTrash from '../../components/trash/MedicineTrash.vue';
import PackagingTrash from '../../components/trash/PackagingTrash.vue';
import CommandTrash from '../../components/trash/CommandTrash.vue';
import InvoiceTrash from '../../components/trash/InvoiceTrash.vue';
import BatchTrash from '../../components/trash/BatchTrash.vue';
import SaleTrash from '../../components/trash/SaleTrash.vue';

export default defineComponent({
  name: 'Trash',
  components: {
    ProviderTrash,
    ArticleTrash,
    MedicineTrash,
    PackagingTrash,
    BatchTrash,
    SaleTrash,
    CommandTrash,
    InvoiceTrash
  }
});
</script>

<style scoped>

</style>
