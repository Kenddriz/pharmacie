<template>
  <q-btn icon="edit" size="sm" round flat color="positive">
    <q-menu>
      <q-form @submit.prevent="updateInvoice" class="q-pa-md">
        <p class="text-center text-subtitle1">
          Modification de la facture
        </p>
        <q-card flat>
          <q-card-section horizontal>
            <q-card-section class="q-gutter-md q-pa-none q-mr-sm">
              <q-input
                hide-bottom-space
                dense
                outlined
                label="Référence *"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Entrer la référence']"
                v-model="updateInput.reference"
              />
              <DateInput
                dense
                v-model="updateInput.dueDate"
                outlined
                label="Date d'échéance *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Entrer la date d\'échéance']"
              />
            </q-card-section>
            <q-card-section class="q-gutter-md q-pa-none">
              <DateInput
                dense
                v-model="updateInput.deliveryDate"
                outlined
                label="Date de livraison *"
                lazy-rules
                :rules="[val => val && val.length > 0 || 'Entrer la date de livraison']"
              />
              <q-input
                outlined
                dense
                type="number"
                label="Charges d'achat"
                :model-value="updateInput.expense"
                v-model.number="updateInput.expense"
              />
            </q-card-section>
          </q-card-section>

          <q-card-actions align="around">
            <q-btn
              v-close-popup
              class="col"
              label="Valider"
              no-caps
              rounded
              outline
              type="submit"
              color="grey"
            />
            <q-btn
              v-close-popup
              label="Fermer"
              no-caps
              color="grey"
              rounded
              outline
              class="col"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Invoice } from '../../graphql/types';
import { useUpdateInvoice } from '../../graphql/invoice/invoice.service';
import DateInput from '../shared/DateInput.vue';

export default defineComponent({
  name: 'UpdateInvoice',
  components: {DateInput},
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      ...useUpdateInvoice(props.invoice)
    }
  }
});
</script>

<style scoped>

</style>
