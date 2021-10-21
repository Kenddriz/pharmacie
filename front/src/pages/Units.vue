<template>
  <q-page class="row">
    <div class="col-12 col-md-6 q-pa-sm">
      <PackagingCpt @remove="medicinesUser" />
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
            <FormCpt @remove="medicinesUser"  />
          </q-tab-panel>
          <q-tab-panel name="dosages" class="q-pa-none">
            <DosageCpt @remove="medicinesUser" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    <q-page-sticky position="top" :offset="[18, 18]">
      <q-btn fab-mini color="primary" text-color="white" icon="info" rounded>
        <q-menu anchor="top middle" self="bottom middle" class="overflow-hidden">
          <q-list padding style="max-width: 350px">
            <q-item v-for="(u, index) in $tm('unit.indications')" :key="index">
              <q-item-section avatar>
                <q-avatar size="25px" color="primary" text-color="white">{{index}}</q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{u.title}}</q-item-label>
                <q-item-label caption>
                  {{u.body}}
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

import PackagingCpt from '../components/packaging/PackagingCpt.vue';
import DosageCpt from '../components/dosage/DosageCpt.vue';
import { defineComponent, ref } from 'vue';
import FormCpt from '../components/form/FormCpt.vue';
import { useQuasar } from 'quasar';
import MedicinesUseMeasure from '../components/medicine/MedicinesUseMeasure.vue';

export default defineComponent({
  name: 'Units',
  components: { PackagingCpt, DosageCpt, FormCpt },
  setup() {
    const { dialog } = useQuasar();
    return {
      tab: ref<string>('forms'),
      medicinesUser: (event: unknown[]) => {
        dialog({
          component: MedicinesUseMeasure,
          componentProps: {measureId: event[0], foreignKey: event[1]}
        })
      }
    }
  }
})
</script>

<style scoped>

</style>
