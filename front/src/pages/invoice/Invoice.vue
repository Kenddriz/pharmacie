<template>
  <q-page class="row q-pa-sm">
    <q-card bordered flat square class="col-12 col-md-9 q-ma-none">
      <ScrollArea class="q-pa-sm" :style="`height:${$q.screen.height - 130}px;`">
        <PaymentMode :payment-modes="paymentModes" />
        <q-separator />
        <InvoiceDetails :payment-modes="paymentModes" :invoice="selectedInvoice" />
      </ScrollArea>
    </q-card>
    <div class="col-12 col-md-3">
      <div class="text-h6 text-center">Liste de factures</div>
      <q-list
        ref="scrollTargetRef"
        :style="`max-height: ${$q.screen.height - 150}px`"
        class="scroll-y"
        separator
      >
        <q-item
          clickable
          v-ripple
          v-for="(invoice, i) in invoices.items"
          :active="selectedInvoice.id === invoice.id"
          active-class="bg-warning text-white"
          :key="i"
          @click="setSelectedInvoice(i)"
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{invoice.command.provider.name.charAt(0)}}
            </q-avatar>
          </q-item-section>
          <q-item-section>{{invoice.command.provider.name}}</q-item-section>
          <q-item-section>{{invoice.reference}}</q-item-section>
          <q-item-section side>
            <q-item-label>
              payée
              <q-icon v-if="invoice.payment" size="md" color="primary" name="price_check" />
              <q-icon v-else size="sm" color="positive" name="unpublished" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import PaymentMode from '../../components/payment/Method.vue';
import { defineComponent } from 'vue';
import { usePaginateInvoices } from '../../graphql/invoice/invoice.service';
import { formatDate } from '../../shared/date';
import InvoiceDetails from '../../components/invoice/InvoiceDetails.vue';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import { usePaymentModes } from '../../graphql/method/method.service';

export default defineComponent({
  name: 'Invoice',
  components: { PaymentMode, InvoiceDetails, ScrollArea },
  setup() {
    return {
      ...usePaginateInvoices(),
      ...usePaymentModes(),
      formatDate
    }
  }
});
</script>

<style scoped>

</style>
