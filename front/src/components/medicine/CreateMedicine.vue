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
          <q-input outlined v-model="createInput.designation"></q-input>
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
            :pagination="{ page: 1, rowsPerPage: selectedForms.length }"
            flat
          >
            <template v-slot:top="props">
              <div class="col-3 q-table__title">Les différentes formes</div>
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
                        <q-radio dense v-model="props.row.unitId" :val="unit.id" :label="unit.label" />
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </q-td>
                <q-td key="quantity" :props="props">
                  {{ props.row.quantity }}
                  <q-popup-edit fit v-model="props.row.quantity">
                    <q-input type="number" v-model.number="props.row.quantity" dense>
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
                  {{ props.row.price }}Ar/{{findUnit(usedUnits[props.pageIndex])?.label}}
                  <q-popup-edit
                    fit v-model="props.row.price"
                    title="Prix Unitaire" buttons
                    label-cancel="annuler" label-set="ok"
                  >
                    <q-input type="number" v-model.number="props.row.price" dense autofocus >
                      <template v-slot:append>
                        <q-btn flat label="unité" no-caps>
                          <q-menu>
                            <q-list>
                              <q-item
                                v-for="unit in pathToChild(props.row.unitId)"
                                :key="unit.id" clickable v-close-popup tabindex="0"
                              >
                                <q-radio dense v-model="usedUnits[props.pageIndex]" :val="unit.id" :label="unit.label" />
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

          </q-table>
          <q-card flat bordered class="col-3">
            <q-card-section align="center" class="text-h5">
              Bilan d'ajout
            </q-card-section>

            <q-separator />

            <q-card-section></q-card-section>
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
    findUnit: Function,
    pathToChild: Function
  },
  setup(props) {
    const { createInput, addForm } = useCreateMedicine();
    const selectedForms = ref<number[]>([]);
    const usedUnits = ref<number[]>([]);
    watch(() =>[...selectedForms.value], selected => {
      addForm(selected,props.childrenOptions[0]?.id||0);
      usedUnits.value = createInput.medicineForms.map(u => u.unitId);
    })
    return {
      FORM_COLUMNS,
      dialog: ref<boolean>(false),
      selectedForms,
      createInput, addForm,
      usedUnits,
      removeForm: (id: number) => selectedForms.value = selectedForms.value.filter(f => f !== id)
    }
  }
});
</script>

<style scoped>

</style>
