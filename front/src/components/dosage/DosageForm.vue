<template>
  <q-menu v-model="show" @before-show="$emit('before-show')">
    <q-form @submit.prevent="show=false; $emit('submit')" class="q-ma-md">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">{{title}}</div>
      <div class="row items-center no-wrap q-gutter-md">
        <q-input
          stack-label
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          dense
          label="Désignation"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Entrer un libellé']"
          :placeholder="placeholder"
        />
        <q-btn class="col-1" type="submit" flat icon="send" />
      </div>
    </q-form>
  </q-menu>
</template>

<script lang="ts">
export default {
  name: 'DosageForm',
  props: {
    modelValue: String,
    title: String,
    placeholder: String
  },
  emits: ['submit', 'update:modelValue', 'before-show'],
  data() {
    return {
      show: false
    }
  }
};
</script>

<style scoped>

</style>
