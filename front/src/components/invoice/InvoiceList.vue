<template>
  <div>
    <template v-if="paymentId === 0">
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
              :loading="loading"
            />
          </template>
        </q-input>
      </div>
      <div class="text-h6 text-center">Liste de factures</div>
    </template>
    <q-list
      :style="`height: ${$q.screen.height - height}px`"
      class="scroll-y"
      separator
    >
      <q-item
        v-for="(invoice, i) in invoices.items"
        :active="modelValue[0]?.id === invoice.id"
        active-class="bg-brown-1"
        :key="i"
        :clickable="!showMenuOp"
        @click="itemClick(i)"
      >
        <MenuOperations
          v-if="showMenuOp"
          :icons="['read_more', 'delete']"
          :labels="['Détailler', 'Supprimer']"
          @restore="setModelValue(i)"
          @remove="softRemoveInvoice(invoice.id)"
          :color="modelValue[0]?.id === invoice.id ? 'warning' : 'primary'"
        />
        <q-item-section>{{invoice.command.provider.name}}</q-item-section>
        <q-item-section>{{invoice.reference}}</q-item-section>
        <q-item-section side>
          <q-item-label class="status">
            payée
            <q-icon
              v-if="invoice.payment"
              color="primary"
              class="status"
              size="sm"
              name="price_check"
            />
            <q-icon
              v-else
              size="xs"
              color="warning"
              class="status"
              name="unpublished"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <slot v-if="$slots.default"></slot>
    </q-list>
    <div style="border-top: 1px solid gainsboro" class="q-mt-sm flex flex-center">
      <q-pagination
        :model-value="paginationInput.page"
        flat
        v-model="paginationInput.page"
        color="primary"
        :max="invoices.meta.totalPages"
        input
        @update:model-value="findInvoices"
        :disable="invoices.meta.totalPages <= 1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, PropType, onActivated } from 'vue';
import { usePaginateInvoices, useSoftRemoveInvoice } from '../../graphql/invoice/invoice.service';
import { Invoice } from '../../graphql/types';
import { cloneDeep } from '../../graphql/utils/utils';
import MenuOperations from '../shared/MenuOperations.vue';

export default defineComponent({
  name: 'InvoiceList',
  components: { MenuOperations },
  props: {
    modelValue: {
      type: Array as PropType<Invoice[]>,
      default: () => ([])
    },
    pLoading: Boolean,
    total: Number,
    showMenuOp: Boolean,
    height: {
      type: Number,
      default: 230
    },
    activated: Boolean,
    paymentId: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:modelValue', 'update:pLoading', 'update:total'],
  setup(props, { emit }) {
    const {
      loading,
      paginationInput,
      findInvoices,
      invoices
    } = usePaginateInvoices(!props.showMenuOp, props.paymentId);
    watch(() => invoices.value, invoice => {
      if(invoice?.items?.length){
        const id = props.modelValue[0]?.id;
        const find = invoice.items.find(item => item.id === id)||invoice.items[0];
        if(find) emit('update:modelValue', [cloneDeep(find)]);
        emit('update:total', invoice.meta.totalItems);
      }else {
        emit('update:modelValue', []);
        emit('update:total', 0);
      }
    }, { immediate: true })
    const setModelValue = (index: number) => {
      emit('update:modelValue', invoices.value.items.slice(index));
    }
    watch(() => loading.value, l => emit('update:pLoading', l), { immediate: true });
    onActivated(() => {
      if(props?.activated)findInvoices();
    });
    return {
      loading,
      setModelValue,
      invoices,
      paginationInput,
      findInvoices,
      itemClick: (i: number) => {
        if(!props.showMenuOp)setModelValue(i);
      },
      ...useSoftRemoveInvoice()
    }
  }
});
</script>

<style lang="scss" scoped>
  .bg-teal-14 {
    color: white;
    .status {
      color: white!important;
    }
  }
</style>
