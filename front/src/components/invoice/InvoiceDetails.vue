<template>
   <q-card flat class="text-blue-grey-14">
     <q-card-section horizontal class="q-mb-sm">
       <q-list>
         <q-item-label header>
           Informations supplémentaires
           <UpdateInvoice :invoice="invoice" />
         </q-item-label>
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
             <q-item-label>Date de livraison</q-item-label>
             <q-item-label caption>{{formatDate(invoice.deliveryDate, 'DATE_ONLY')}}</q-item-label>
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
         <q-item>
           <q-item-section avatar>
             <q-icon name="money" />
           </q-item-section>
           <q-item-section>
             <q-item-label>Frais divers</q-item-label>
             <q-item-label caption>{{invoice.expense}}</q-item-label>
           </q-item-section>
         </q-item>
       </q-list>
       <div class="col">
         <div class="text-subtitle1 text-center">
           Payment <PaymentForm
           :invoice-id="invoice.id"
           :payment="invoice.payment"
           :payment-modes="paymentModes.methods"
         />
         </div>
         <q-card
           style="height: calc(100% - 26px)"
           square bordered flat
           class="column justify-center items-center text-h3"
         >
           Status : {{invoice.payment ? 'Reglée' : 'Impayée'}}
         </q-card>
       </div>
     </q-card-section>
   </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Invoice } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import UpdateInvoice from './UpdateInvoice.vue';
import PaymentForm from '../payment/PaymentForm.vue';
import { useMethods } from '../../graphql/method/method.service';

export default defineComponent({
  name: 'InvoiceDetails',
  components: { UpdateInvoice, PaymentForm },
  props: {
    invoice: Object as PropType<Invoice>
  },
  setup() {
    return {
      formatDate,
      ...useMethods()
    }
  }
});
</script>

<style scoped>

</style>
