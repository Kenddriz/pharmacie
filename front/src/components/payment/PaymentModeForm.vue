<template>
  <q-card class="q-pa-md" style="width: 300px">
    <q-card-section class="text-subtitle1 q-pt-none">{{title}}</q-card-section>
    <q-form @submit="$emit('submit')" class="q-gutter-md">
      <q-input
        outlined
        :model-value="modelValue.label"
        v-model="model.label"
        label="La désignation *"
        hint="Désignation du mode"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Taper quelque chose']"
      />

      <div>
        <q-btn
          flat
          label="Valider"
          type="submit"
          color="primary"
        />
        <q-btn
          label="Fermer"
          color="primary"
          flat class="q-ml-sm"
          @click="$emit('close')"
        />
        <q-btn
          v-if="withRemove"
          color="deep-orange"
          flat class="q-ml-sm"
          @click="$emit('remove')"
          icon="delete_forever"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { PaymentModeInput } from '../../graphql/types';

export default defineComponent({
  name: 'CreatePaymentMode',
  props: {
    modelValue: {
      type: Object as PropType<PaymentModeInput>,
      default: () => ({}),
    },
    title: {
      type: String,
      default: 'Nouveau mode de payment'
    },
    withRemove: Boolean
  },
  emits: ['submit', 'close', 'remove'],
  setup(props){
    return {
      model: reactive<PaymentModeInput>(props.modelValue)
    }
  }
});
</script>

<style scoped>

</style>
