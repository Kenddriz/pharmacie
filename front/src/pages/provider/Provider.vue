<template>
  <q-page class="row justify-center items-start q-pa-md">
    <FournisseurForm class="col-12 col-md-3" />
    <ProviderTable class="col" />
  </q-page>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import FournisseurForm from '../../components/provider/ProviderForm.vue';
  import ProviderTable from '../../components/provider/table/ProviderTable.vue';

  export default defineComponent({
    name: 'Fournisseur',
    components: { FournisseurForm, ProviderTable }
  })
</script>

<style scoped>

</style>
