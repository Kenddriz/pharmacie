<template>
  <q-dialog ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        {{label ? 'Modifcation du mode de payment' : 'Nouveau mode de payment'}}
      </template>
      <q-form spellcheck="false" @submit="$emit('ok', model)" class="column">
        <q-input
          dense
          outlined
          :model-value="model"
          v-model="model"
          label="La désignation *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Taper quelque chose']"
        />
        <q-btn
          v-close-popup
          no-caps
          outline
          label="Enregistrer"
          type="submit"
          color="primary"
        />
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MovableCard from '../shared/MovableCard.vue';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'MethodForm',
  components: {MovableCard},
  props: {
    label: String
  },
  emits: ['ok'],
  setup(props){
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      model: ref<string>(props?.label||'')
    }
  }
});
</script>

<style scoped>

</style>
