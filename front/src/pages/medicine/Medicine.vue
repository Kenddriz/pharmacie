<template>
 <!-- <div class="fit row justify-center q-mt-md content-center">
    <Alert
      v-for="index in 3"
      :key="index"
      label="TOTAL PAR "
      :value="index"
    />
  </div>-->
  <div class="row q-pa-sm q-gutter-sm">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="createInput"
      :columns="MEDICINE_COLS"
      :pagination="{ page: 1, rowsPerPage: createInput.length }"
      row-key="id"
      table-class="table-border"
      class="col"
      separator="cell"
      hide-pagination
      loading-label="Chargement des données"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props">
          {{ props.col.label }}
          <q-icon v-if="props.col.name !=='id'" name="border_color" size="xs" />
        </q-th>
      </template>

      <template v-slot:top>
        <q-toolbar-title>Mes médicaments</q-toolbar-title>
          <q-btn
            @click="addCreateInput()"
            no-caps
            icon="add"
            color="primary"
            label="Nouveau"
            class="q-mr-lg"
          />
          <q-btn
            no-caps
            icon="save"
            color="primary"
            label="Enregistrer"
            :disable="!createInput.length"
            @click="removeRow"
          />
      </template>

      <!--<template v-slot:top-row>
        <MedicineTableForm
          v-for="i in createInput.length"
          :key="i"
          :forms="forms"
          :children-options="orphanUnits()"
          :units="units"
          v-model:model-value="createInput[i - 1]"
          @update:form="addForm($event, i - 1)"
        />
      </template>-->
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
          </q-td>
          <q-td key="designation" :props="props">
            {{ props.row.designation }}
            <q-popup-edit v-model="props.row.designation">
              <q-input v-model="props.row.designation" dense />
            </q-popup-edit>
          </q-td>
          <q-td key="form" :props="props">
              {{ props.row.medicineForms.length }}
          </q-td>
          <q-td key="form" :props="props" auto-width>
            <q-btn
              icon="delete_forever"
              flat
              color="deep-orange"
              round
              @click="removeRow(props.pageIndex)"
            ></q-btn>
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand">
          <q-td colspan="100%" style="padding: 0;">
            <q-table
              :rows="createInput[props.pageIndex].medicineForms"
              :columns="FORM_COLUMNS"
              row-key="formId"
              hide-bottom
              square
              :pagination="{ page: 1, rowsPerPage: createInput[props.pageIndex].medicineForms.length }"
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
      <template v-slot:bottom-row>
        <q-tr>
          <q-td colspan="100%">
            En train de préparer {{createInput.length}} nouveau(x) médicament(s)
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { FORM_COLUMNS, MEDICINE_COLS } from '../../components/medicine/columns';
  import { useMedicines } from '../../graphql/medicine/read/medicines.service';
  //import MedicineTableForm from '../../components/medicine/MedicineTableForm.vue';
  import { useCreateMedicine } from '../../graphql/medicine/create/create.medicine.service';
  import { useForms } from '../../graphql/medicine-types/read/forms.service';
  import { useUnits } from '../../graphql/unit/units/units.service';

  export default defineComponent({
    name: 'Medicine',
    setup() {
      return {
        MEDICINE_COLS,
        FORM_COLUMNS,
        ...useMedicines(),
        ...useCreateMedicine(),
        ...useForms(),
        ...useUnits()
      }
    }
  });
</script>

<style lang="scss" scoped>
 .table-border {
   border-color: gainsboro;
   border-top-width: 1px;
   border-right-width: 1px;
   border-left-width: 1px;
 }
</style>
