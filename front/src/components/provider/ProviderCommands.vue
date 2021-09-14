<template>
  <q-card flat>
    <q-card-section :horizontal="$q.screen.gt.sm">
      <q-card-section class="justify-around q-pt-none q-pb-none">
        <q-input
          input-class="text-center"
          placeholder="Année de commande"
          class="q-mb-md"
          dense
          type="number"
        >
          <template v-slot:prepend>
            <span class="text-dark text-body2 text-weight-bold">Année : </span>
          </template>
          <template v-slot:append>
            <q-icon color="dark" name="send" class="cursor-pointer" />
          </template>
        </q-input>
        <q-list separator bordered>
          <q-item @click="$emit('more')" clickable v-ripple>
            <q-item-section side>
              N°45
            </q-item-section>
            <q-item-section>
              <q-item-label>Date</q-item-label>
              <q-item-label caption lines="1">12/12/2018</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="read_more" color="green" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-pagination
              :model-value="2"
              :max="5"
              input
            />
          </q-item>
        </q-list>

        <q-btn
          class="q-mt-sm"
          icon="add"
          no-caps
          flat
          color="brown"
          label="Nouvelle commande"
          @click="$emit('add')"
        />
      </q-card-section>
      <q-separator :vertical="$q.screen.gt.sm" />
      <q-card-section class="col">Courbe de commande annuelle</q-card-section>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProviderCommands',
  emits: ['more', 'add'],
  props: {
    providerId: {
      type: Number,
      required: true
    }
  }
});
</script>

<style scoped>

</style>
