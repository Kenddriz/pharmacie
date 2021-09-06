<template>
  <q-list bordered class="rounded-borders">
    <q-item-label header>Ligne de commandes</q-item-label>

    <q-item v-for="(cl, index) in commandLines" :key="index">
      <q-item-section side avatar>
        <q-avatar>
          LC{{ index + 1 }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          Identifiant
        </q-item-label>
        <q-item-label caption lines="1">
          {{cl.id}}
        </q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label>Médicament</q-item-label>
        <q-item-label caption>
          {{cl.medicine.article.commercialName}}
          {{cl.medicine.dosage.label}}
          , {{cl.medicine.form.label}}
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label>
          Quantité
        </q-item-label>
        <UnitConverter
          :value="cl.quantity"
          :units="cl.medicine.packaging.units"
        />
      </q-item-section>
    </q-item>
  </q-list>
  <q-banner class="bg-grey-3 q-mt-lg">
    <template v-slot:avatar>
      <q-icon size="sm" name="event" color="primary" />
    </template>
    <div class="text-h6 text-center"> Cette commande a été livrée le 12/03/2020</div>
    <template v-slot:action>
      <q-btn flat no-caps icon="info" color="primary" label="Infos de la livraison" />
    </template>
  </q-banner>
  <q-card-actions class="row justify-around q-mt-lg">
    <q-btn
      outline
      no-caps
      rounded
      icon="receipt_long"
      color="brown"
      label="Facturation"
    />
    <q-btn
      outline
      no-caps
      rounded
      icon="download"
      color="brown"
      label="Télécharger"
    />
    <q-btn
      outline
      no-caps
      rounded
      icon="delete_sweep"
      color="red-12"
      label="Archiver"
    />
  </q-card-actions>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CommandLine } from '../../graphql/types';
import UnitConverter from '../packaging/UnitConverter.vue';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'CommandDetails',
  props: {
    commandLines: Array as PropType<CommandLine[]>
  },
  components: { UnitConverter },
  setup() {
    return {
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
