<template>
  <ScrollArea style="height: calc(100vh - 160px);">
    <div class="row wrap q-gutter-md q-pa-md">
      <q-btn icon-right="add" fab-mini text-color="primary">
        <FormForm />
      </q-btn>
      <q-card flat bordered v-for="(fm, i) in forms" :key="i">
        <q-card-section class="text-center">{{fm.label}}</q-card-section>
        <q-separator />
        <q-card-actions>
          <q-btn-group flat>
            <q-btn text-color="positive" icon="edit">
              <FormForm :fm="fm" />
            </q-btn>
            <q-btn
              text-color="orange"
              icon="delete_forever"
              @click="$emit('remove', [fm.id, 'formId'])"
            />
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </div>
  </ScrollArea>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ScrollArea from '../shared/ScrollArea.vue';
import { useForms } from '../../graphql/form/form.service';
import FormForm from './FormForm.vue';

export default defineComponent({
  name: 'FormCpt',
  components: { ScrollArea, FormForm },
  emits: ['remove'],
  setup() {
    return {
      ...useForms()
    }
  }
});
</script>

<style scoped>

</style>
