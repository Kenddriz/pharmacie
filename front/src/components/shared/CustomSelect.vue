<template>
  <q-select
    :multiple="multiple"
    transition-show="scale"
    transition-hide="scale"
    dense
    borderless
    options-dense
    hide-bottom-space
    hide-hint
    v-model="model"
    use-input
    :label="label ? label : 'Option'"
    :options="opt"
    @filter="filterFn"
    behavior="menu"
    :emit-value="valueOnly"
    :map-options="valueOnly"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
      <q-item v-bind="itemProps">
        <q-item-section>
          <q-item-label v-html="opt.label"></q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle
            :model-value="selected"
            @update:model-value="toggleOption(opt)"
          />
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> Aucun résultat </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { makeOptions, SelectOption } from './select';

export default defineComponent({
  name: 'CustomSelect',
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    modelValue: {},
    valueOnly: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: String
  },
  emits: ['update:modelValue'],
  setup(props) {
    const opt = ref<SelectOption[]>([]);
    watch(() => props.options, opts => {
      opt.value = makeOptions(opts);
    }, { immediate: true });
    return {
      opt,
      model: ref<typeof props.modelValue>(props.modelValue),
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
    };
  },
});
</script>

<style scoped></style>
