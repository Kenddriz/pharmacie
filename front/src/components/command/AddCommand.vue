<template>
  <q-markup-table
    v-if="provider"
    flat
    bordered
    separator="cell"
  >
    <thead >
    <tr>
      <th colspan="3">
        <div class="row no-wrap items-center">
          <q-img
            style="width: 70px"
            :ratio="1"
            class="rounded-borders"
            src="register.jpg"
          />
          <div class="q-ml-md">
            <div class="text-h4">{{provider.name}}</div>
            <span>{{getOneContact(provider.contacts)}}</span>
          </div>
          <q-space />
          <slot name="end"></slot>
        </div>
      </th>
    </tr>
    <tr>
      <th v-for="(col, index) in cmData" :key="index">{{col.label}}</th>
    </tr>
    </thead>
    <tbody>
      <tr class="q-tr--no-hover">
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
            v-close-popup
            no-caps
            outline
            color="primary"
            label="Enregistrer la commande"
            icon-right="save"
            @click="submit"
            :disable="!commandLineInput.length"
            :loading="ccLoading"
          />
        </td>
      </tr>
      <tr class="q-tr--no-hover" v-for="(ipt, index) in commandLineInput" :key="index">
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
    </tbody>
  </q-markup-table>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import ArticleSelect from '../article/ArticleSelect.vue';
import { CommandLineInput, Packaging, Provider } from '../../graphql/types';
import { FindOneArticleOption } from '../../graphql/article/article.service';
import PackagingInput from '../packaging/PackagingInput.vue';
import { useCreateCommand } from '../../graphql/command/command.service';
import { getOneContact } from '../../graphql/utils/utils';
import { cmData } from '../command-line/cmData';

export default defineComponent({
  name: 'AddCommand',
  components: { ArticleSelect, PackagingInput },
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    }
  },
  setup(props) {
    const { ccLoading, createCommand } = useCreateCommand();
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
        createCommand(props.provider.id, commandLines);
        commandLineInput.value.length = 0;
      }
    }
    return {
      commandLineInput,
      addLine,
      removeLine,
      setLine,
      submit,
      ccLoading,
      getOneContact,
      cmData,
    }
  },
});
</script>
