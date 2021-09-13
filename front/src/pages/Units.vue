<template>
  <q-page class="row">
    <div class="col-12 col-md-6 q-pa-sm">
      <ConditioningComponent />
    </div>
    <div class="col-12 col-md-6 q-pa-sm">
      <q-card
        bordered
        flat square
      >
        <q-tabs
          no-caps
          v-model="tab"
          align="justify"
          active-color="primary"
          indicator-color="primary"
        >
          <q-tab name="forms" icon="mail" label="Formes" />
          <q-tab name="dosages" icon="alarm" label="Dosages" />
        </q-tabs>
        <q-separator />
        <q-tab-panels keep-alive v-model="tab" animated>
          <q-tab-panel name="forms" class="q-pa-none">
            <FormCpt />
          </q-tab-panel>
          <q-tab-panel name="dosages" class="q-pa-none">
            <DosageCpt />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-page-sticky position="top" :offset="[18, 18]">
      <q-btn fab-mini color="secondary" text-color="warning" icon="info" rounded>
        <q-menu anchor="top middle" self="bottom middle" class="overflow-hidden">
          <q-list padding style="max-width: 400px">
            <q-item>
              <q-item-section avatar>
                <q-icon color="positive" name="info" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Formes et dosages</q-item-label>
                <q-item-label caption>
                  Paramètres de prix d'un médicament.
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon color="positive" name="info" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Unités de vente</q-item-label>
                <q-item-label caption>
                  Une ligne d'unités de vente représente les différentes possibilités de vendre un médicament.
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section avatar>
                <q-icon name="info" color="positive" />
              </q-item-section>
              <q-item-section>
                <q-item-label>A retenir</q-item-label>
                <q-item-label caption>
                  Forme, dosage et unités de vente sont nécéssaires pour créer un médicament.
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">

import ConditioningComponent from '../components/packaging/PackagingCpt.vue';
import DosageCpt from '../components/dosage/DosageCpt.vue';
import { defineComponent, ref } from 'vue';
import FormCpt from '../components/form/FormCpt.vue';

export default defineComponent({
  name: 'Units',
  components: { ConditioningComponent, DosageCpt, FormCpt },
  setup() {
    return {
      tab: ref<string>('forms'),
    }
  }
})
</script>

<style scoped>

</style>
