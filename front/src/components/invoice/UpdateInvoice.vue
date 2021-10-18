<template>
  <q-btn icon="edit" size="sm" round flat color="positive">
    <q-menu class="text-blue-grey-14">
      <q-card flat>
        <q-bar class="text-subtitle1 text-white bg-teal-14">
          Modification de la facture {{invoice.reference}}
          <q-space />
          <q-btn dense v-close-popup flat round icon="close" />
        </q-bar>
        <q-form class="q-pa-md" @submit.prevent="updateInvoice(updateInput)">
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
          <q-card-actions class="q-px-none" align="between">
            <q-btn
              v-close-popup
              class="col"
              label="Valider"
              no-caps
              outline
              type="submit"
              color="primary"
            />
            <q-btn
              v-close-popup
              label="Fermer"
              no-caps
              color="primary"
              outline
              class="col"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue';
import { Invoice, UpdateInvoiceInput } from '../../graphql/types';
import { useUpdateInvoice } from '../../graphql/invoice/invoice.service';
import DateInput from '../shared/DateInput.vue';

export default defineComponent({
  name: 'UpdateInvoice',
  components: {DateInput},
  props: {
    invoice: {
      type: Object as PropType<Invoice>,
      required: true
    }
  },
  setup(props) {
    const updateInput = reactive<UpdateInvoiceInput>({
      id: 0, deliveryDate: '', dueDate: '', expense: 0, reference: ''
    });
    function setUpdateInput() {
      const { id, deliveryDate, dueDate, expense, reference } = props.invoice;
      Object.assign(updateInput, { id, deliveryDate, dueDate, expense, reference });
    }
    watch(() => props.invoice, () => {
      setUpdateInput();
    }, { deep: true, immediate: true })
    return {
      ...useUpdateInvoice(),
      updateInput
    }
  }
});
</script>

<style scoped>

</style>
