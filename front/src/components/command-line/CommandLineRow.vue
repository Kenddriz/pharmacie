<template>
  <tr>
    <td colspan="7">
      <!--@click="addAddCmdLine"-->
      <q-btn
        label="Nouvelle ligne"
        class="q-mr-md"
        color="primary"
        icon="add"
        no-caps
        @click="addLine"
      />
      <!-- v-if="input.commandLines.length"-->
      <q-btn
        no-caps
        outline
        color="primary"
        label="Enregistrer les lignes"
        icon-right="save"
        @click="submit"
        :disable="!commandLineInput.length"
        :loading="loading"
      />
    </td>
  </tr>
  <tr v-for="(ipt, index) in commandLineInput" :key="index">
    <td>
      <ArticleSelect @update="setLine($event, index)" />
    </td>
    <td>
      <PackagingInput
        :units="ipt.pkg.units"
        @set-model="ipt.quantity = $event"
      />
    </td>
    <td>
      <q-btn
        icon="delete"
        round
        unelevated
        dense
        text-color="orange"
        @click="removeLine(index)"
      />
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import ArticleSelect from '../article/ArticleSelect.vue';
import { CommandLineInput, Packaging } from '../../graphql/types';
import { FindOneArticleOption } from '../../graphql/article/article.service';
import PackagingInput from '../packaging/PackagingInput.vue';

export default defineComponent({
  name: 'CommandLineRow',
  components: { ArticleSelect, PackagingInput },
  emits: ['onSubmit'],
  props: { loading: Boolean },
  setup(__, {emit}) {
    const commandLineInput = ref<(CommandLineInput & { pkg: Packaging })[]>([]);
    function addLine() {
      commandLineInput.value.push({
        medicineId: 0, quantity: 1,
        pkg: { id: 0, units: [] }
      })
    }
    function removeLine(index: number) {
      commandLineInput.value.splice(index, 1);
    }
    function setLine(data: FindOneArticleOption, index: number) {
      commandLineInput.value[index].pkg = data.packaging;
      commandLineInput.value[index].medicineId = data.value;
    }
    function submit() {
      const commandLines: CommandLineInput[] = [];
      commandLineInput.value.forEach(val => {
        const { quantity, medicineId } = val;
        if(medicineId > 0)commandLines.push({ quantity, medicineId });
      });
      if(commandLines.length) {
        emit('onSubmit', commandLines);
        commandLineInput.value.length = 0;
      }
    }
    return {
      commandLineInput,
      addLine,
      removeLine,
      setLine,
      submit
    }
  },
});
</script>
