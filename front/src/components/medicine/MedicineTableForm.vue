<template>
  <q-tr :class="`${model.medicineForms.length ? '' : 'bg-info'}`">
    <q-td auto-width>
      <q-btn
        size="sm"
        color="info"
        round
        dense
        @click="expand = !expand"
        :icon="expand ? 'remove' : 'add'"
      />
    </q-td>
    <q-td>
      {{ model.designation }}
      <q-popup-edit
        label-cancel="annuler" label-set="ok"
        fit v-model="model.designation"
        title="La désignation" buttons
      >
        <q-input type="text" v-model="model.designation" dense autofocus />
      </q-popup-edit>
    </q-td>
    <q-td style="width: 50%">
      <CustomSelect
        v-model="optionModel"
        :options="forms"
        :multiple="true"
        label="Choix des formes"
      />
    </q-td>
    <q-td auto-width>
      <q-btn
        size="sm"
        color="amber"
        round
        dense
        icon="delete_forever"
      />
    </q-td>
  </q-tr>
  <q-tr v-show="expand">
    <q-td colspan="100%" style="padding: 0;">
      <q-table
        :rows="model.medicineForms"
        :columns="FORM_COLUMNS"
        row-key="formId"
        hide-bottom
        square
        v-model:pagination="pagination"
        flat
        style="border-top-width: 0; width: calc(100% + 0.5px); border-bottom-width: 0"
      >
        <template v-slot:top="props">
          <div class="col-2 q-table__title">Les différentes formes</div>
          <q-space />
          <q-btn
            flat round dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            class="q-ml-md"
          />
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="formId" :props="props">
              {{ formLabel(props.row.formId) }}
            </q-td>
            <q-td auto-width key="unitId" :props="props">
              <CustomSelect
                style="background: whitesmoke; max-width: 250px"
                class="q-pr-md q-pl-md"
                v-model:modelValue="props.row.unitId"
                :options="childrenOptions"
                label=" "
                @update:model-value="parentModel[props.pageIndex] = props.row.unitId"
              />
            </q-td>
            <q-td key="quantity" :props="props">
              {{ props.row.quantity }}
              <q-popup-edit fit v-model="props.row.quantity">
                <q-input type="number" v-model.number="props.row.quantity" dense />
              </q-popup-edit>
            </q-td>
            <q-td auto-width key="maxUnit">
              <CustomSelect
                style="max-width: 220px; background: whitesmoke;"
                class="q-pr-md q-pl-md"
                :options="pathToChild(props.row.unitId, units)"
                v-model:modelValue="parentModel[props.pageIndex]"
                label=" "
              />
            </q-td>
            <q-td key="expiration" :props="props">
              {{ props.row.expiration }}
              <q-popup-edit
                fit model-value="createInput.expiration"
                title="Date d'expiration" buttons
                label-cancel="annuler" label-set="ok"
              >
                <q-input type="text" mask="##/##/####" v-model="props.row.expiration" dense autofocus />
              </q-popup-edit>
            </q-td>

            <q-td key="vat" :props="props">
              {{ props.row.vat }} %
              <q-popup-edit
                fit v-model="props.row.vat"
                title="Prix Unitaire" buttons
                label-cancel="annuler" label-set="ok"
              >
                <q-input
                  type="number"
                  v-model.number="props.row.vat"
                  dense autofocus
                  suffix="%"
                />
              </q-popup-edit>
            </q-td>

            <q-td key="price" :props="props">
              {{ props.row.price }}
              <q-popup-edit
                fit v-model="props.row.price"
                title="Prix Unitaire" buttons
                label-cancel="annuler" label-set="ok"
              >
                <q-input type="number" v-model.number="props.row.price" dense autofocus />
              </q-popup-edit>
            </q-td>

          </q-tr>
        </template>

      </q-table>
    </q-td>
  </q-tr>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';
import { CreateMedicineInput, Form, Unit } from '../../graphql/types';
import CustomSelect from '../shared/CustomSelect.vue';
import { FORM_COLUMNS } from './columns';
import { pathToChild } from '../../graphql/unit/units/units.service';

export default defineComponent({
  name: 'MedicineTableForm',
  props: {
    childrenOptions: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    modelValue: {
      type: Object as PropType<CreateMedicineInput>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      required:true
    },
  },
  emits: ['update:form'],
  components: { CustomSelect },
  setup(props, {emit}) {
    const optionModel = ref<number[]>([1]);
    const pagination = ref({ page: 1, rowsPerPage: 1});

    const model = reactive<CreateMedicineInput>(props.modelValue);
    const parentModel = ref<number[]>( []);

    watch(() => [...optionModel.value], options => {
      emit('update:form', options);
      pagination.value = { page: 1, rowsPerPage: props.modelValue.medicineForms.length };
      model.medicineForms = model.medicineForms.map(med => ({...med, unitId: props.childrenOptions[0]?.id }));
      parentModel.value = Array(model.medicineForms.length).fill(props.childrenOptions[0]?.id||1);
    }, { immediate: true })
    return {
      expand: ref<boolean>(false),
      model,
      parentModel,
      optionModel,
      FORM_COLUMNS,
      pagination,
      formLabel: (id: number) => props.forms.find(f => f.id === id)?.label,
      pathToChild
    }
  }
});
</script>

<style scoped>

</style>
