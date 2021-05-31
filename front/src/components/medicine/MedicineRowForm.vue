<template>
  <q-tr>
    <q-td auto-width>
      <q-btn round color="positive" size="sm" icon="remove_circle" />
    </q-td>
    <td key="designation">
      {{ createInput.designation }}
      <q-popup-edit fit v-model="createInput.designation" title="La désignation" buttons>
        <q-input type="text" v-model="createInput.designation" dense autofocus />
      </q-popup-edit>
    </td>
    <td key="expiration">
      {{ createInput.expiration }}
      <q-popup-edit fit model-value="createInput.expiration" title="Date d'expiration" buttons>
        <q-input type="text" mask="##/##/####" v-model="createInput.expiration" dense autofocus />
      </q-popup-edit>
    </td>

    <td key="form" style="max-width: 150px">
      <CustomSelect
        v-model="optionsModel"
        :options="forms"
        :multiple="true"
        :value-only="false"
        label="Choix des formes"
        @update:model-value="setCreateForm($event)"
      />
    </td>
    <td key="prices">
      <q-btn @click="dialog = !!createInput.medicineForms.length" icon="settings" round />
      <q-dialog
        v-model="dialog"
        persistent
      >
        <q-table
          :rows="[]"
          fullscreen
          bordered
          hide-no-data
          hide-pagination
        >
          <template v-slot:top>
            <span>Paramètrage de prix</span>
            <q-space />
            <q-btn
              no-caps
              dense
              color="primary"
              icon="close"
              flat
              @click="dialog = false"
            />
          </template>
          <template v-slot:top-row>
            <q-td class="flex flex-center q-gutter-sm fit">
              <MedicineForm
                v-for="(item, index) in createInput.medicineForms"
                :key="index"
                v-model:modelValue="createInput.medicineForms[index]"
                :form-label="formLabels[index]"
                :min-unit-options="orphanUnits()"
                :ref-options="pathToChild(item.unitId)"
              />
            </q-td>
          </template>
        </q-table>
      </q-dialog>
    </td>
  </q-tr>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useForms } from '../../graphql/medicine-types/read/forms.service';
  import CustomSelect from '../shared/CustomSelect.vue';
  import { useCreateMedicine } from '../../graphql/medicine/create/create.medicine.service';
  import { PRICE_COLS } from './columns';
  import MedicineForm from './MedicineForm.vue';
  import { useUnits } from '../../graphql/unit/units/units.service';

  export default defineComponent({
    name: 'MedicineRowForm',
    components: { CustomSelect, MedicineForm },
    setup() {
      const { forms } = useForms();
      const { units, findUnit, pathToChild, orphanUnits } = useUnits();
      return {
        forms,
        dialog: ref<boolean>(false),
        ...useCreateMedicine(),
        optionsModel: ref<number[]>([]),
        PRICE_COLS,
        units, findUnit, pathToChild, orphanUnits
      }
    }
  });
</script>

<style scoped>

</style>
