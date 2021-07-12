<template>
  <q-btn
    no-caps
    icon="add"
    color="primary"
    label="Nouveau"
    class="q-mr-lg"
    @click="dialog = true"
  >
    <q-dialog v-model="dialog" full-width>
      <q-card>
        <q-bar class="bg-teal text-white">
          <q-icon name="settings" />
          <q-toolbar-title>Nouveaux médicaments ({{createInput.medicineForms.length}})</q-toolbar-title>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section horizontal class="flex flex-center q-gutter-md q-mt-none">
          <q-input outlined v-model="createInput.designation" label="désignation">
          </q-input>
          <q-btn-dropdown
            outline
            color="primary"
            stretch split
            no-caps
          >
            <template v-slot:label>
              Formes de médicament <b class="text-red-10 q-ml-sm">({{selectedForms.length}})</b>
            </template>
            <q-list dense>
              <q-item v-for="form of forms" :key="form.id" clickable>
                <q-checkbox
                  v-model="selectedForms"
                  :val="form.id"
                  :label="form.label"
                  color="teal"
                />
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section>
        <q-card-section class="row q-gutter-sm">
          <q-table
            :rows="createInput.medicineForms"
            :columns="FORM_COLUMNS"
            row-key="formId"
            separator="cell"
            class="col"
            bordered
            hide-bottom
            square
            v-model:pagination="pagination"
            flat
          >
            <template v-slot:top="props">
              <div class="q-table__title">Paramètrage des différentes formes</div>
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
                <q-td key="formId" :props="props" auto-width>
                  {{forms.find(f => f.id === props.row.formId).label}}
                </q-td>
                <q-td auto-width key="unitId" :props="props">
                  <q-btn-dropdown
                    no-caps stretch
                    flat :label="findUnit(props.row.unitId)?.label"
                  >
                    <q-list>
                      <q-item-label header>Unité minimale de vente</q-item-label>
                      <q-item v-for="unit in childrenOptions" :key="unit.id" clickable v-close-popup tabindex="0">
                        <q-radio
                          dense
                          v-model="props.row.unitId"
                          :val="unit.id"
                          :label="unit.label"
                          @update:model-value="usedUnits[props.pageIndex].unit = $event"
                        />
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </q-td>
                <q-td key="quantity" :props="props">
                  {{ usedUnits[props.pageIndex].quantity }}
                  <q-popup-edit fit v-model="usedUnits[props.pageIndex].quantity">
                    <q-input type="number" v-model.number="usedUnits[props.pageIndex].quantity" dense>
                    </q-input>
                  </q-popup-edit>
                </q-td>
                <q-td auto-width key="expiration" :props="props">
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
                  {{ usedUnits[props.pageIndex].price }}Ar/
                  {{findUnit(usedUnits[props.pageIndex].unit)?.label}}
                  <q-popup-edit
                    fit v-model="usedUnits[props.pageIndex].price"
                    title="Prix Unitaire" buttons
                    label-cancel="annuler" label-set="ok"
                  >
                    <q-input type="number" v-model.number="usedUnits[props.pageIndex].price" dense autofocus >
                      <template v-slot:append>
                        <q-btn flat label="unité" no-caps>
                          <q-menu>
                            <q-list>
                              <q-item
                                v-for="unit in pathToChild(props.row.unitId)"
                                :key="unit.id" clickable v-close-popup tabindex="0"
                              >
                                <q-radio dense v-model="usedUnits[props.pageIndex].unit" :val="unit.id" :label="unit.label" />
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </template>
                    </q-input>
                  </q-popup-edit>
                </q-td>

                <q-td key="action" :props="props" auto-width>
                  <q-btn @click="removeForm(props.row.formId)"
                         icon="delete_forever" color="deep-orange"
                         round flat
                  >
                  </q-btn>
                </q-td>
              </q-tr>
            </template>
            <template v-slot:bottom-row>
              <q-tr>
                <q-td colspan="100%">
                  <q-btn
                    :disable="!createInput.designation || !selectedForms.length"
                    no-caps
                    unelevated
                    color="primary"
                    outline
                    class="full-width"
                    @click="submit"
                    label="Enregistrer ce médicament"
                  ></q-btn>
                </q-td>
              </q-tr>
            </template>
          </q-table>

          <q-card bordered flat class="col-3">
            <q-toolbar class="bg-teal text-white shadow-2">
              <div class="text-subtitle1 text-center full-width">Prix en fonction de l'unité minimale</div>
            </q-toolbar>

            <q-list separator>
              <q-item v-for="(form, index) in usedUnits" :key="index" clickable v-ripple>
                <q-item-section v-if="(min = findUnit(createInput.medicineForms[index].unitId)) && (max = findUnit(form.unit))">
                  <q-item-label >
                    <p><b>{{max.multiplicity}}</b> {{ max.label }} &lt;=&gt; <b>{{min.multiplicity}}</b> {{ min.label }}</p>
                    Donc : <b>{{form.price}}/{{ max.label }}</b> &lt;=&gt;
                    <b>{{(form.price*max.multiplicity/min.multiplicity).toFixed(3)}}/{{ min.label }}</b>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>

        </q-card-section>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Form, Unit } from '../../graphql/types';
import { FORM_COLUMNS } from './columns';
import { useCreateMedicine } from '../../graphql/medicine/create/create.medicine.service';

export default defineComponent({
  name: 'CreateMedicine',
  props: {
    childrenOptions: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      required:true
    },
    findUnit: {type: Function, required: true},
    getProportion: {type: Function, required: true},
    pathToChild: Function
  },
  setup(props) {
    const { createInput, addForm, submitCreation, creationLoading, usedUnits } = useCreateMedicine();
    const selectedForms = ref<number[]>([]);
    const pagination = { page: 1, rowsPerPage: 0 }
    watch(() =>[...selectedForms.value], selected => {
      addForm(selected,props.childrenOptions[0]?.id||0);
      pagination.rowsPerPage = selected.length;
    });
    async function submit () {
      usedUnits.value.forEach((v, index) => {
        const proportion = props.getProportion(createInput.medicineForms[index].unitId, v.unit)
        createInput.medicineForms[index].quantity = v.quantity * proportion.quantity;
        createInput.medicineForms[index].price = v.price * proportion.price;
      });
      await submitCreation();
    }
    return {
      FORM_COLUMNS,
      dialog: ref<boolean>(false),
      selectedForms,
      createInput,
      submit, creationLoading,
      pagination,
      usedUnits,
      removeForm: (id: number) => selectedForms.value = selectedForms.value.filter(f => f !== id)
    }
  }
});
</script>

<style scoped>

</style>
