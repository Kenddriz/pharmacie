<template>
  <div class="flex flex-center q-gutter-md q-pt-sm">
    <Alert
      label="Articles"
      :value="counts.countArticles"
      icon="pages"
      :loading="loading"
    />
    <Alert
      label="Formes"
      :value="counts.countForms"
      icon="merge_type"
      :loading="loading"
    />
    <Alert
      label="Dosages"
      :value="counts.countDosages"
      icon="straighten"
      :loading="loading"
    />
    <Alert
      label="Médicaments"
      :value="counts.countMedicines"
      icon="healing"
      :loading="loading"
    />
    <Alert
      label="Fournisseurs"
      :value="counts.countProviders"
      icon="group"
      :loading="loading"
    />
    <Alert
      label="Commandes non livrées"
      :value="counts.countUndeliveredCommands"
      icon="touch_app"
      :loading="loading"
    />
    <Alert
      label="Factures impayées"
      :value="counts.countUnpaidInvoices"
      icon="receipt"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounter } from '../../../graphql/other/other.service';
import Alert from './Alert.vue';

export default defineComponent({
  name: 'Counter',
  components: { Alert },
  setup() {
    return {
      ...useCounter()
    }
  }
});
</script>

<style scoped>

</style>
