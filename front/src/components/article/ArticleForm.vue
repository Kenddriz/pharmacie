<template>
  <q-form
    spellcheck="false"
    @submit="$emit('submit', input)"
    class="q-pa-md" style="min-width: 250px"
  >
    <slot name="title"></slot>
    <q-input
      :model-value="input.dci"
      v-model="input.dci"
      dense
      label="dci"
    />
    <q-input
      :model-value="input.commercialName"
      v-model="input.commercialName"
      dense
      label="nom commercial*"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Nom commercial obligatoire']"
    />
    <div class="row justify-between q-mt-sm items-center">
      <q-btn
        v-close-popup
        type="submit"
        no-caps
        rounded
        outline
        color="primary"
        dense
        label="Enregistrer"
        class="q-pr-md q-pl-md"
      />
      <q-btn
        v-if="mode === 'update'"
        no-caps
        rounded
        outline
        color="warning"
        dense
        class="q-pr-md q-pl-md"
        label="supprimer"
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue';
import { SaveArticleInput } from '../../graphql/types';

export default defineComponent({
  name: 'ArticleForm',
  props: {
    mode: {
      type: String,
      default: 'add'
    },
    model: {
      type: Object as PropType<SaveArticleInput>
    }
  },
  emits: ['submit'],
  setup(props) {
    const input = reactive<SaveArticleInput>({
      id: 0,
      dci: '',
      commercialName: ''
    });
    if(props?.model) Object.assign(input, props.model);
    return {
      input,
      color: props.mode === 'update' ? 'white' : 'dark'
    }
  }
});
</script>

<style scoped>

</style>
