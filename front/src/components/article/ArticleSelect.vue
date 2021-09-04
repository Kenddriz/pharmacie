<template>
  <q-select
    :model-value="model"
    v-model="model"
    use-input
    hide-selected
    fill-input
    :options="options"
    @filter="filterFn"
    @input-value="faInput = $event"
    borderless
    dense
    :loading="faLoading"
    label="Nom du médicament"
    spellcheck="false"
    input-debounce="0"
    behavior="menu"
    @update:model-value="$emit('update', model)"
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
import { defineComponent, PropType } from 'vue';
import { FindOneArticleOption, useFindOneArticleForCommand } from '../../graphql/article/article.service';

export default defineComponent({
  name: 'ArticleSelect',
  emits: ['update'],
  props: {
    modelValue: Object as PropType<FindOneArticleOption>
  },
  setup(props) {
    const {
      filterFn,
      faLoading,
      faInput,
      options,
      model
    } = useFindOneArticleForCommand(props.modelValue||new FindOneArticleOption());
    return {
      filterFn,
      faLoading,
      faInput,
      options,
      model
    }
  }
});
</script>

<style scoped>

</style>
