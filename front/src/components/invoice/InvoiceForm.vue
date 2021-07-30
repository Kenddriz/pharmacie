<template>
 <q-card class="q-pa-md" style="max-width: 300px">
   <q-card-section class="q-pt-none text-center text-subtitle1">
     Facture da la commande
   </q-card-section>
   <q-separator />
   <q-form @submit="$emit('submit')" class="q-gutter-md">
     <q-input
       label="Référence *"
       hint="La référence de la facture"
       lazy-rules
       :rules="[ val => val && val.length > 0 || 'Entrer la référence']"
       v-model="model.reference"
     />

     <q-input
       v-model="model.dueDate"
       type="text"
       mask="##/##/####"
       label="Date d'échéance *"
       hint="La date d'échéance de la facture"
       lazy-rules
       :rules="[val => val && val.length > 0 || 'Entrer la date d\'échéance']"
     />

     <q-checkbox label="Je confirme que la commande est arrivée et prête à être mise en stock." />
     <q-btn-group push>
       <q-btn label="Valider" no-caps flat type="submit" color="primary"/>
       <q-btn label="Fermer" no-caps @click="$emit('close')" color="primary" flat class="q-ml-sm" />
     </q-btn-group>
   </q-form>
 </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { CreateInvoiceInput, UpdateInvoiceInput } from '../../graphql/types';

export default defineComponent({
  name: 'InvoiceForm',
  emits: ['close', 'submit'],
  props: {
    modelValue: {
      type: Object as PropType<CreateInvoiceInput|UpdateInvoiceInput>,
      default: () => ({})
    }
  },
  setup(props) {
    return {
      model: reactive<CreateInvoiceInput|UpdateInvoiceInput>(props.modelValue)
    }
  }
});
</script>

<style scoped>

</style>
