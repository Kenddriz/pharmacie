<template>
 <!-- <div class="fit row justify-center q-mt-md content-center">
    <Alert
      v-for="index in 3"
      :key="index"
      label="TOTAL PAR "
      :value="index"
    />
  </div>-->
  <div class="q-pa-sm q-gutter-sm">
    <q-table
      flat
      bordered
      :rows="medicines"
      :columns="MEDICINE_COLS"
      row-key="id"
      table-class="table-border"
      separator="cell"
      loading-label="Chargement des données"
      :loading="medicinesLoading"
    >
      <template v-slot:top>
        <q-toolbar-title>Mes médicaments</q-toolbar-title>
          <CreateMedicine
            :forms="forms"
            :children-options="orphanUnits()"
            :findUnit="findUnit"
            :pathToChild="pathToChild"
            :getProportion="getProportion"
          />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" no-hover>
          <q-td auto-width>
            <q-btn size="sm" color="positive" round dense
               @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="designation" :props="props">
            {{ props.row.designation }}
          </q-td>
          <q-td key="form" :props="props">
            {{ props.row.medicineForms.length }}
          </q-td>
          <q-td auto-width key="form" :props="props" class="q-gutter-sm">
            <MedicineOperations
              :designation="props.row.designation"
              :id="props.row.id"
              @submit="updateMedicine($event)"
            />
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props" no-hover>
          <q-td colspan="100%">
            <div class="flex flex-center q-gutter-sm">
              <q-list bordered v-for="(medForm, index) in props.row.medicineForms" :key="index">
                <q-item>
                  <q-item-section>
                    <q-item-label header>
                      {{medForm.form.label}}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-fab flat padding="xs" icon="more_vert" color="primary" direction="left">
                      <q-fab-action padding="xs" color="amber" icon="delete" />
                      <q-fab-action
                        @click="setUpdateMedFormInput(medForm)"
                        padding="xs" color="blue-5" icon="edit"
                      />
                    </q-fab>
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section>
                    <q-item-label>Quantité en magasin</q-item-label>
                    <q-item-label caption>{{medForm.shop}} {{medForm.unit.label}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset />

                <q-item>
                  <q-item-section>
                    <q-item-label>Quantité en stock</q-item-label>
                    <q-item-label caption>{{medForm.stock}} {{medForm.unit.label}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset />

                <q-item>
                  <q-item-section>
                    <q-item-label>Prix unitaire de vente</q-item-label>
                    <q-item-label caption>{{medForm.price}}/{{medForm.unit.label}}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-separator inset />

                <q-item>
                  <q-item-section>
                    <q-item-label>Date d'expiration</q-item-label>
                    <q-item-label caption>{{medForm.expiration}}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
              <q-btn
                v-if="forms.length > props.row.medicineForms.length"
                round color="teal" glossy icon="add" @click="setMedicine(props.row)"
              />
            </div>
          </q-td>
        </q-tr>
      </template>

    </q-table>

    <q-dialog v-model="showAddMedForm">
      <MedicineCreateForm
        v-model:modelValue="addMedFormInput"
        :forms="forms.filter(f => !existForms.includes(f.id))"
        :units="orphanUnits()"
        @cancel="showAddMedForm = false"
        @submit="AddMedForm"
        :path-to-child="pathToChild"
        :title="`Nouvelle forme de ${medicines.find(med => med.id === addMedFormInput.medicineId).designation}`"
      />
    </q-dialog>

    <q-dialog v-model="showUpdateMedForm">
      <MedicineUpdateForm
        :min="orphanUnits()"
        :path-to-child="pathToChild"
        v-model:model-value="updateMedFormInput"
        @cancel="showUpdateMedForm = false"
        :title="`Mise à jour de la forme ${typeMedFormLabel}`"
        @submit="updateMedForm"
      />
    </q-dialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { FORM_COLUMNS, MEDICINE_COLS } from '../../components/medicine/columns';
  import { useMedicines } from '../../graphql/medicine/read/medicines.service';
  import { useForms } from '../../graphql/medicine-types/read/forms.service';
  import { useUnits } from '../../graphql/unit/units/units.service';
  import MedicineOperations from '../../components/medicine/MedicineOperations.vue';
  import CreateMedicine from '../../components/medicine/CreateMedicine.vue';
  import { useAddMedForm } from '../../graphql/medicineForm/addForm/add.medicine.form.service';
  import MedicineUpdateForm from '../../components/medicine/MedicineUpdateForm.vue';
  import MedicineCreateForm from '../../components/medicine/MedicineCreateForm.vue';
  import { useUpdateMedicineForm } from '../../graphql/medicineForm/update/updateMedicineForm.service';
  import { useUpdateMedicine } from '../../graphql/medicine/update/updateMedicine.service';

  export default defineComponent({
    name: 'Medicine',
    components: { CreateMedicine, MedicineOperations, MedicineCreateForm, MedicineUpdateForm },
    setup() {
      return {
        MEDICINE_COLS,
        FORM_COLUMNS,
        ...useMedicines(),
        ...useForms(),
        ...useUnits(),
        ...useAddMedForm(),
        ...useUpdateMedicineForm(),
        ...useUpdateMedicine()
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
