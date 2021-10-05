<template>
  <div class="flex flex-center q-gutter-md q-pt-sm">
    <Alert
      label="Articles"
      :value="counts.countArticles"
    />
    <Alert
      label="Formes"
      :value="counts.countForms"
    />
    <Alert
      label="Dosages"
      :value="counts.countDosages"
    />
    <Alert
      label="Médicaments"
      :value="counts.countMedicines"
    />
    <Alert
      label="Fournisseurs"
      :value="counts.countProviders"
    />
    <Alert
      label="Commandes non livrées"
      :value="counts.countUndeliveredCommands"
    />
    <Alert
      label="Factures impayées"
      :value="counts.countUnpaidInvoices"
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
