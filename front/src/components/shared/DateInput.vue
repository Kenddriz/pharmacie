<template>
  <q-input
    hide-bottom-space
    :model-value="model"
    v-model="model"
    @update:model-value="$emit('update:modelValue', format())"
    :mask="$tm('local.dateMask')"
    lazy-rules
    :rules="[ val => validateDate(val) || 'Entrer une date valide']"
    input-class="text-blue-grey-14"
  >
    <template v-slot:append>
      <slot></slot>
    </template>
  </q-input>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { validateDate } from '../../graphql/utils/utils';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'DateInput',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props) {
    const model = ref<string>('');
    if(props.modelValue)model.value = formatDate(props.modelValue, 'DATE_ONLY');
    return {
      model,
      validateDate,
      format: () => {
        return model.value.split('/').reverse().join('-');
      }
    }
  }
});
</script>

<style scoped>
 * {
   color: #455a64;
 }
</style>
