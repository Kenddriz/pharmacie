<template>
  <div class="flex flex-center q-gutter-sm">
    <q-input
      :model-value="modelValue"
      outlined
      dense
      :label="label"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <q-btn
      @click="$emit('remove')"
      size="md"
      icon="delete"
      text-color="teal-5"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ContactInput',
    props: {
      label: String,
      modelValue: {
        type: String,
        required: true
      }
    },
    emits: ['remove', 'update:modelValue'],
  })
</script>

<style scoped>

</style>
