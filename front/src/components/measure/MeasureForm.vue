<template>
  <q-menu>
    <q-form @submit="$emit('submit')" class="q-ma-md">
      <div class="text-h6 q-mb-md">{{title}}</div>
      <div class="row items-center no-wrap q-gutter-md">
        <q-input
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          dense
          label="Désignation"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Entrer un libellé']"
        />
        <q-btn class="col-1" type="submit" flat icon="send" />
      </div>
    </q-form>
  </q-menu>
</template>

<script lang="ts">
export default {
  name: 'MeasureForm',
  props: {
    modelValue: String,
    title: String
  },
  emits: ['submit', 'update:modelValue']
};
</script>

<style scoped>

</style>
