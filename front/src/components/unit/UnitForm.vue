<template>
  <q-dialog
    @before-hide="$emit('update:open', dialog)"
    v-model="dialog"
    persistent
  >
    <q-card style="width: 350px; max-width: 80vw;">
      <q-card-section class="q-pb-sm text-h6">
        {{ title }}
        <CustomSelect
          v-if="options"
          :multiple="false"
          v-model="model.parentId"
          :options="options"
          label="Unité source"
        />
      </q-card-section>

      <q-separator inset />

      <q-card-section>
        <form
          @submit.prevent="$emit('submit')"
          autocomplete="off"
          spellcheck="false"
        >
          <q-input
            input-class="text-grey-14"
            v-model="model.label"
            dense
            outlined
            label="Libelle"
            clearable
            class="q-mb-md"
          />
          <q-input
            input-class="text-grey-14"
            v-model="model.description"
            outlined
            clearable
            type="textarea"
            label="Description"
          />
          <q-input
            v-if="model.parentId > 0"
            input-class="text-grey-14"
            v-model.number="model.multiplicity"
            dense
            outlined
            :label="`Multiplicité % à l'unité n°${model.parentId}`"
            clearable
            class="q-mt-md"
          />
          <q-card-actions align="between">
            <q-btn
              v-close-popup
              flat
              color="primary"
              :icon="icon"
              :label="submitLabel"
              :disable="!model.label"
              type="submit"
            />
            <q-btn
              v-close-popup
              flat
              label="Fermer"
              color="primary"
            />
          </q-card-actions>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, ref, watch } from 'vue';
import { CreateUnitInput, Unit, UpdateUnitInput } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';

export default defineComponent({
  name: 'UnitForm',
  components: { CustomSelect },
  props: {
    icon: String,
    submitLabel: String,
    modelValue: {
      type: Object as PropType<UpdateUnitInput|CreateUnitInput>,
      required: true
    },
    options: Array as PropType<Unit[]>,
    open: {
      type: Boolean,
      required: true
    },
    title: String
  },
  emits: ['submit', 'update:open'],
  setup(props) {
    const model = reactive<UpdateUnitInput|CreateUnitInput>(props.modelValue);
    const dialog = ref<boolean>(props.open);
    watch(() => props.open, op => {
      dialog.value = op;
    })
    return {
      model,
      dialog
    };
  },
});
</script>
