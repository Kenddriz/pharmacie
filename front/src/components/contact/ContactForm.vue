<template>
  <div class="flex no-wrap flex-center q-gutter-sm q-pa-sm">
    <q-input
      :model-value="modelValue"
      standout
      filled
      dense
      :label="label"
      @update:model-value="$emit('update:modelValue', $event)"
      @keyup.enter="$emit('submit')"
      :loading="loading"
    />
    <q-fab padding="xs" :color="color" unelevated icon="keyboard_arrow_left" direction="left">
      <q-fab-action
        padding="5px"
        icon="delete_forever"
        color="deep-orange"
        @click="$emit('reset')"
      />
      <q-fab-action
        padding="5px"
        color="teal-5"
        @click="$emit('submit')"
        icon="save"
      />
    </q-fab>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ContactForm',
    props: {
      label: String,
      modelValue: {
        type: String,
        required: true
      },
      color: String,
      loading: Boolean
    },
    emits: ['submit', 'reset', 'update:modelValue']
  })
</script>

<style scoped>

</style>
