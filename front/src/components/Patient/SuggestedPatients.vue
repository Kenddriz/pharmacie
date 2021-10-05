<template>
  <q-input
    dense
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    lazy-rules
    :rules="[val => val && val.length > 0]"
    hide-bottom-space
    @keyup="submit"
    @click="$refs['op'].toggle($event)"
    aria-controls="overlay_panel"
    :label="modelValue"
    input-class="text-blue-grey-14"
    spellcheck="false"
    autocomplete="off"
  >
    <OverlayPanel
      ref="op"
      appendTo="body"
      :showCloseIcon="true"
      id="overlay_panel"
      class="text-blue-grey-14"
      :base-z-index="5000"
    >
      <q-list padding>
        <q-item
          v-for="item in patients"
          :key="item.id"
          clickable
          @click="getPatient(item); $refs['op'].toggle($event)"
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{item.id}}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.name}}</q-item-label>
            <q-item-label caption>{{item.phone}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item v-if="!patients.length" class="text-subtitle1 q-pa-lg">
          Aucun client/patient correspondant.
        </q-item>
        <q-inner-loading :showing="fgpLoading">
          <q-spinner-ball size="50px" color="primary" />
        </q-inner-loading>
      </q-list>
    </OverlayPanel>
  </q-input>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFindSuggestions } from '../../graphql/patient/patient.service';
import OverlayPanel from '../shared/overlaypanel/OverlayPanel.vue';
import { Patient } from '../../graphql/types';

export default defineComponent({
  name: 'SuggestedPatients',
  components: { OverlayPanel },
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['select', 'update:modelValue'],
  setup(props, {emit}) {
    const {
      patients,
      fgpLoading,
      findSuggestions
    } = useFindSuggestions();
    function submit() {
      emit('select', {id : 0 });
      if(props.modelValue)findSuggestions(props.modelValue);
    }
    function getPatient(patient: Patient) {
      const { id, name, phone } = patient;
      emit('select', { id, name, phone });
    }
    return {
      patients,
      fgpLoading,
      submit,
      getPatient
    }
  }
});
</script>

<style scoped>

</style>
