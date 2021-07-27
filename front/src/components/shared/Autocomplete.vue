<template>
  <q-select
    :model-value="modelValue"
    dense
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    :options="opt"
    @filter="filterFn"
    @input-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Aucun résultat
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { makeOptions, SelectOption } from './select';

export default defineComponent({
  name: 'Autocomplete',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    modelValue: {
      type: String,
      required: true
    },
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const opt = ref<SelectOption[]>([]);
    watch(() => [...props.options], opts => {
      opt.value = makeOptions(opts);
      if(props.modelValue === '' && opt.value.length)
        emit('update:modelValue', opt.value[0].label)
    }, { immediate: true });
    return {
      opt,
      filterFn(val: string, update: any) {
        if (val === '') {
          update(() => {
            opt.value = makeOptions(props.options);
          });
          return;
        }

        update(() => {
          const needle = val.toLowerCase();
          opt.value = opt.value.filter(
            (v: SelectOption) => v.label.toLowerCase().indexOf(needle) > -1
          );
        });
      },
    }
  }
});
</script>

<style scoped>

</style>
