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
      :rows="medicines"
      :columns="MEDICINE_COLS"
      row-key="id"
      table-class="table-border"
      class="col"
      separator="cell"
      loading-label="Chargement des données"
      :loading="medicinesLoading"
    >
      <template v-slot:header-cell="props">
        <q-th :props="props">
          {{ props.col.label }}
          <q-icon v-if="props.col.name !=='id'" name="border_color" size="xs" />
        </q-th>
      </template>

      <template v-slot:top>
        <q-toolbar-title>Mes médicaments</q-toolbar-title>
          <CreateMedicine
            :forms="forms"
            :children-options="orphanUnits()"
            :findUnit="findUnit"
            :pathToChild="pathToChild"
          />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="designation" :props="props">
            {{ props.row.designation }}
          </q-td>
          <q-td key="form" :props="props">
            {{ props.row.medicineForms.length }}
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
  import { useForms } from '../../graphql/medicine-types/read/forms.service';
  import { useUnits } from '../../graphql/unit/units/units.service';
  import CreateMedicine from 'components/medicine/CreateMedicine.vue';

  export default defineComponent({
    name: 'Medicine',
    components: { CreateMedicine },
    setup() {
      return {
        MEDICINE_COLS,
        FORM_COLUMNS,
        ...useMedicines(),
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
