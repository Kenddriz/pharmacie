<template>
  <q-input
    hide-bottom-space
    :model-value="model"
    v-model="model"
    @update:model-value="$emit('update:modelValue', format())"
    :mask="$tm('local.dateMask')"
    lazy-rules
    :rules="[ val => validateDate(val) || 'Entrer une date valide']"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { validateDate } from '../../graphql/utils/utils';

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
    const model = ref<string>(props.modelValue);
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

</style>
