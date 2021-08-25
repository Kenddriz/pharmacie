<template>
  <tr>
    <td colspan="7">
      <q-btn
        label="Nouvelle ligne"
        class="q-mr-md"
        color="primary"
        icon="add"
        @click="addAddCmdLine"
        no-caps
      />
      <q-btn
        v-if="input.commandLines.length"
        no-caps
        outline
        color="primary"
        label="Enregistrer les lignes"
        icon-right="save"
        @click="submit()"
        :loading="addCmdLineLoading"
      />
    </td>
  </tr>
  <tr v-for="(ipt, i) in input.commandLines" :key="i">
    <td>
      <Autocomplete
        style="width: 150px"
        :options="medicines"
        v-model="ipt.medicine"
        :model-value="ipt.medicine"
      />
    </td>
    <td>
      <custom-select
        style="width: 150px"
        :options="forms"
        v-model="ipt.formId"
      />
    </td>
    <td>
      <custom-select
        style="width: 150px"
        :options="getUnits(ipt.medicine, i)"
        v-model="ipt.unitId"
      />
    </td>
    <td>
      <q-input
        style="width: 80px"
        min="0"
        type="number"
        v-model.number="ipt.quantity"
        :model-value="ipt.quantity"
        dense
      />
    </td>
    <td>
      <q-input
        style="width: 100px"
        min="0"
        type="number"
        v-model.number="ipt.price"
        :model-value="ipt.price"
        dense
      />
    </td>
    <td>
      <q-input
        min="0"
        max="100"
        type="number"
        v-model.number="ipt.vat"
        :model-value="ipt.vat"
        dense
      />
    </td>
    <td>
      <q-btn
        icon="delete"
        round
        unelevated
        dense
        text-color="orange"
        @click="removeCmdLine(i)"
      />
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Form, Medicine, Unit } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';
import Autocomplete from '../shared/Autocomplete.vue';
import { useCreateCommandLine } from '../../graphql/command-lines/add/add.command-line.service';

export default defineComponent({
  name: 'CommandLineRow',
  components: {CustomSelect, Autocomplete},
  props: {
    medicines: {
      type: Array as PropType<Medicine[]>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      required: true
    },
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    pathToChild: {
      type: Function,
      required: true
    },
    commandId: {
      type: Number,
      required: true
    },
    emitValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submitted'],
  setup() {
    return {
      ...useCreateCommandLine()
    }
  },
  methods: {
    getUnits(medicine: string,i: number): Unit[] {
      const fms = this.medicines.find(m => m.designation.toLowerCase() === medicine.toLowerCase())?.medicineForms;
      if(fms?.length) {
        const form = fms.find(f => f.form.id == this.input.commandLines[i].formId);
        if(form) return this.pathToChild(form.unit.id);
      }
      return this.units;
    },
    async submit() {
      const lines = await this.submitAddCommandLine(this.commandId);
      if(this.emitValue) this.$emit('submitted', lines);
    }
  }
});
</script>
