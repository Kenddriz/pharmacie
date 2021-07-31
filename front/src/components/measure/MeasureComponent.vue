<template>
  <q-card
    bordered
    flat square
    class="col-12 col-md-6 q-mt-md"
  >
    <q-card-section class="text-subtitle1">Les unités de mesures</q-card-section>
    <ScrollArea style="height: calc(100vh - 185px);">
      <q-stepper
        v-model="step"
        vertical
        header-nav
        color="primary"
        animated
        flat
        keep-alive
      >
        <q-step
          v-for="(measure, index) in measures"
          :key="index"
          :name="index"
          :title="measure.label"
          icon="settings"
          active-icon="add"
        >
          <div class="row wrap q-gutter-md q-pa-md">
            <q-btn icon-right="add" fab-mini text-color="primary">
              <MeasureForm
                v-model="measureInput.label"
                @submit="addUnit(measure.id)"
                title="Unité [ ex: 50mg, 60ml,etc. ]"
              />
            </q-btn>
            <q-card v-for="u in measure.children" :key="u.id">
              <q-card-section class="text-center">{{u.label}}</q-card-section>
              <q-card-actions>
                <q-btn-group>
                  <q-btn icon="edit" />
                  <q-btn icon="delete_forever" />
                </q-btn-group>
              </q-card-actions>
            </q-card>
          </div>
        </q-step>
      </q-stepper>
    </ScrollArea>
  </q-card>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab-mini icon="add" color="secondary">
      <MeasureForm
        v-model="measureInput.label"
        @submit="saveMeasure"
        title="Unité de mesure"
      />
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useMeasures, useSaveMeasure } from '../../graphql/measure/measure.service';
import MeasureForm from './MeasureForm.vue';
import ScrollArea from '../shared/ScrollArea.vue';

export default defineComponent({
  name: 'MeasureComponent',
  components: { MeasureForm, ScrollArea },
  setup(){
    return {
      ...useMeasures(),
      ...useSaveMeasure(),
      step: ref<number>(0)
    }
  }
});
</script>

<style scoped>

</style>
