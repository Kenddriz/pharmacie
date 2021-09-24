<template>
  <q-card flat bordered>
    <q-item class="text-white bg-teal">
      <q-item-section side>
        <q-icon color="white" name="calculate" size="md" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-h6">
          Calculatrice
        </q-item-label>
        <q-item-label class="text-white" caption>
          Entrer le montant du client
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator />
    <q-card-section>
      <div style="font-size: 15px" class="text-blue-grey-14">
        Coût de vente : {{ cost }}
      </div>
      <q-input
        dense
        min="0"
        :model-value="clientSum"
        v-model.number="clientSum"
        input-class="text-center text-blue-grey-14"
        type="number"
      >
        <template v-slot:before>
          <span style="font-size: 15px" class="q-pt-md text-blue-grey-14">
            Montant :
          </span>
        </template>
      </q-input>
      <div style="font-size: 15px" class="row q-mt-md justify-between text-blue-grey-14">
        Remise :
        <div v-if="clientSum > 0" class="text-center col text-center">
          <span v-if="clientSum < cost" class="text-red">
            Montant insuffisant
          </span>
          <span v-else class="text-positive">
            {{ clientSum - cost }}
          </span>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'DiscountCalculator',
  props: {
    cost: {
      type: Number,
      default: 0
    }
  },
  setup() {
    return {
      clientSum: ref<number>(0)
    }
  }
});
</script>

<style scoped>

</style>
