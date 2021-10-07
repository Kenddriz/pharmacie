<template>
  <div class="flex flex-center q-gutter-md q-pt-sm">
    <Alert
      label="Articles"
      :value="counts.countArticles"
      icon="pages"
    />
    <Alert
      label="Formes"
      :value="counts.countForms"
      icon="merge_type"
    />
    <Alert
      label="Dosages"
      :value="counts.countDosages"
      icon="straighten"
    />
    <Alert
      label="Médicaments"
      :value="counts.countMedicines"
      icon="healing"
    />
    <Alert
      label="Fournisseurs"
      :value="counts.countProviders"
      icon="group"
    />
    <Alert
      label="Commandes non livrées"
      :value="counts.countUndeliveredCommands"
      icon="touch_app"
    />
    <Alert
      label="Factures impayées"
      :value="counts.countUnpaidInvoices"
      icon="receipt"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounter } from '../../graphql/counter/counter.service';
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
