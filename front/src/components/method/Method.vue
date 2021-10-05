<template>
  <q-item>
    <q-item-section side>
      <q-icon name="shopping_bag" size="sm" />
    </q-item-section>
    <q-item-section class="text-subtitle1">
      Les modes de payement
    </q-item-section>
  </q-item>
  <div class="row q-gutter-md justify-center">
    <q-card
      style="height: 100px!important;"
      bordered
      @click="creationDialog = true"
      class="col-1 justify-center items-center column"
    >
      <span class="q-mb-sm">Nouveau</span>
      <q-btn color="primary" round icon="add"/>
    </q-card>
    <ScrollArea class="col" style="height: 120px; width: 100%">
      <div class="row no-wrap q-gutter-md">
        <q-card
          bordered
          v-for="(p,i) in paymentModes.methods"
          :key="i"
          class="mCard justify-center items-center column"
          @click="setUpdateInput(p)"
        >
          <div class="q-pa-sm">{{p.label}}</div>
          <q-btn icon="edit"/>
        </q-card>
      </div>
    </ScrollArea>
  </div>
  <q-dialog v-model="creationDialog">
    <PaymentModeForm
      v-model="creationInput"
      @submit="submitCreation"
      @close="creationDialog = false"
    />
  </q-dialog>
  <q-dialog v-model="updateDialog">
    <PaymentModeForm
      v-model="updateInput"
      :title="`Mise à jour de ${updateInput.label}`"
      @submit="submitUpdate"
      @close="updateDialog = false"
      :withRemove="true"
      @remove="submitRemove()"
    />
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollArea from '../shared/ScrollArea.vue';
import {
  useCreatePaymentsMode, useMethods,
  useUpdatePaymentsMode,
} from '../../graphql/method/method.service';
import PaymentModeForm from './MethodForm.vue';

export default defineComponent({
  name: 'PaymentMode',
  components: { ScrollArea, PaymentModeForm },
  setup() {
    return {
      ...useCreatePaymentsMode(),
      ...useUpdatePaymentsMode(),
      ...useMethods()
    }
  },
  methods: {
    submitRemove() {
      this.updateDialog = false;
    }
  }
});
</script>

<style lang="scss" scoped>
  .mCard {
    min-width: 100px;
    height: 100px;
  }
</style>
