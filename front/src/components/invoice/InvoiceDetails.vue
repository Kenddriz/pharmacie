<template>
   <div class="text-h6 q-ma-md">
    <q-icon name="info" size="md" /> Détails de la facture
   </div>
   <q-card v-if="invoice" flat>
     <q-card-section horizontal>
       <div>
         <div class="text-subtitle1 text-grey text-center">Fourniseur</div>
         <CardProvider :provider="invoice.command.provider" :flat="true" />
       </div>
       <q-list>
         <q-item-label header>Informations supplémentaires</q-item-label>
         <q-item>
           <q-item-section avatar>
             <q-icon name="add_business" />
           </q-item-section>
           <q-item-section>
             <q-item-label>Date de création</q-item-label>
             <q-item-label caption>{{formatDate(invoice.createdAt, 'DATE_TIME')}}</q-item-label>
           </q-item-section>
         </q-item>
         <q-item>
           <q-item-section avatar>
             <q-icon name="tag" />
           </q-item-section>
           <q-item-section>
             <q-item-label>Référence</q-item-label>
             <q-item-label caption>{{invoice.reference}}</q-item-label>
           </q-item-section>
         </q-item>
         <q-item>
           <q-item-section avatar>
             <q-icon name="event_available" />
           </q-item-section>
           <q-item-section>
             <q-item-label>Date d'échéance</q-item-label>
             <q-item-label caption>{{formatDate(invoice.dueDate, 'DATE_ONLY')}}</q-item-label>
           </q-item-section>
         </q-item>
       </q-list>
       <div class="col">
         <div class="text-subtitle1 text-grey text-center">Status</div>
         <q-card
           style="height: calc(100% - 26px)"
           square bordered flat
           class="column justify-center items-center text-h2"
         >
           {{invoice.payment ? 'Reglée' : 'Impayée'}}
         </q-card>
       </div>
     </q-card-section>
     <q-separator spaced />
     <q-card-section>
       <PaymentForm
         :payment="invoice.payment"
         :payment-modes="paymentModes"
         :invoiceId="invoice.id"
       />
     </q-card-section>
   </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Invoice, PaymentMode } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import CardProvider from '../provider/CardProvider.vue';
import PaymentForm from '../../components/payment/PaymentForm.vue'

export default defineComponent({
  name: 'InvoiceDetails',
  components: { CardProvider, PaymentForm },
  props: {
    invoice: Object as PropType<Invoice>,
    paymentModes: Array as PropType<PaymentMode[]>
  },
  setup() {
    return {
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
