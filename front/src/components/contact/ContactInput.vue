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
      outline
      color="grey"
    >
      <q-icon name="close" color="deep-orange" />
    </q-btn>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ContactInput',
    props: {
      label: String,
      modelValue: String
    },
    emits: ['remove', 'update:modelValue'],
  })
</script>

<style scoped>

</style>
