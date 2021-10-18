<template>
  <q-form
    class="q-gutter-md text-blue-grey-14"
    @submit="$emit('save', { medicineId: medicine.value, quantity })"
  >
    <div class="text-subtitle1 row justify-between">
      <slot name="title"></slot>
    </div>
    <ArticleSelect
      :model-value="medicine"
      @update="medicine = $event"
      outlined
      label="Nom du médicament*"
      lazy-rules
      :rules="[ val => val.value > 0 || 'Entrer le nom du médicament à commander']"
    />
    <PackagingInput
      :units="medicine.packaging.units"
      @set-model="quantity = $event"
      outlined
      label="Quantité"
      :value="quantity"
    />
    <div class="row justify-end">
      <q-btn
        type="submit"
        color="primary"
        outline
        label="Enregistrer"
        icon="save"
        no-caps
        v-close-popup
      />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import PackagingInput from '../packaging/PackagingInput.vue';
import ArticleSelect from '../article/ArticleSelect.vue';
import { FindOneArticleOption } from '../../graphql/article/article.service';
import { CommandLine, Medicine } from '../../graphql/types';
import { cloneDeep } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'CommandLineForm',
  components: { PackagingInput, ArticleSelect },
  props: {
    commandLine: Object as PropType<CommandLine>
  },
  emits: ['save'],
  setup(props) {
    const medicine = ref<FindOneArticleOption>(new FindOneArticleOption());
    const quantity = ref<number>(1);
    if(props?.commandLine) {
      const med: Medicine = cloneDeep(props.commandLine.medicine);
      Object.assign(medicine.value, {
        value: med.id,
        label: `${med.article.commercialName} ${med.dosage.label}, ${med.form.label}`,
        packaging: med.packaging
      })
      quantity.value = Number(props.commandLine.quantity);
    }
    return {
      medicine,
      quantity
    }
  }
});
</script>

<style scoped>

</style>
