<template>
  <q-page class="row q-pa-sm">
    <q-card bordered flat square class="col-12 col-md-9 q-ma-none">
      <ScrollArea class="q-pa-sm" :style="`height:${$q.screen.height - 130}px;`">
        <PaymentMode />
        <q-separator />
        <AssuredLineDetails
          v-if="selectedInvoice.length"
          :command-lines="selectedInvoice[0].command.commandLines"
          :invoice="selectedInvoice[0]"
        />
      </ScrollArea>
    </q-card>
    <div class="col-12 col-md-3">
      <div class="flex flex-center q-pa-sm" style="border-bottom: 1px solid gainsboro">
        <q-input
          :model-value="paginationInput.keyword"
          v-model="paginationInput.keyword"
          dense
          outlined
          label="Référence de la facture"
          @keyup.enter="findInvoices"
        >
          <template v-slot:after>
            <q-btn
              unelevated
              outline
              color="primary"
              no-caps
              label="Chercher"
              icon="search"
              @click="findInvoices"
              :loading="paginateLoading"
            />
          </template>
        </q-input>
      </div>
      <div class="text-h6 text-center">Liste de factures</div>
      <q-list
        ref="scrollTargetRef"
        :style="`height: ${$q.screen.height - 250}px`"
        class="scroll-y"
        separator
      >
        <q-item
          clickable
          v-ripple
          v-for="(invoice, i) in invoices.items"
          :active="selectedInvoice[0].id === invoice.id"
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
      <div style="border-top: 1px solid gainsboro" class="q-mt-sm flex flex-center">
        <q-pagination
          flat
          v-model="paginationInput.page"
          color="primary"
          :max="invoices.meta.totalPages"
          :max-pages="6"
          boundary-numbers
          @update:model-value="findInvoices"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import PaymentMode from '../../components/method/Method.vue';
import { defineComponent } from 'vue';
import { usePaginateInvoices } from '../../graphql/invoice/invoice.service';
import { formatDate } from '../../shared/date';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import AssuredLineDetails from '../../components/stock-movement/AssuredLineDetails.vue';

export default defineComponent({
  name: 'Invoice',
  components: { PaymentMode, AssuredLineDetails, ScrollArea },
  setup() {
    return {
      ...usePaginateInvoices(),
      formatDate
    }
  },
});
</script>

<style scoped>

</style>
