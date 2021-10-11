<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section class="q-pa-none">
        <MedicineForm
          :forms="forms"
          :selectedForm="selectedForm"
          :dosages="dosages"
          :selectedDosage="selectedDosage"
          :packaging="packagingList"
          :selectedPk="selectedPk"
          :price="medicine.currentSalePrice"
          :vat="medicine.currentVat"
          @submit="updateMedicine(medicine.id, $event)"
        >
          Mise à jour
        </MedicineForm>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import MedicineForm from './MedicineForm.vue';
import { useUpdateMedicine } from '../../graphql/medicine/medicine.service';
import { Medicine } from '../../graphql/types';
import { useForms } from '../../graphql/form/form.service';
import { useDosages } from '../../graphql/dosage/dosage.service';
import { useListPackaging } from '../../graphql/packaging/packaging.service';
import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'UpdateMedicine',
  props: {
    medicine: {
      type: Object as PropType<Medicine>,
      required: true
    }
  },
  components: { MedicineForm },
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useUpdateMedicine(),
      ...useForms(),
      ...useDosages(),
      ...useListPackaging()
    }
  },
  mounted() {
    setTimeout(() => {
      Object.assign(this.selectedForm, this.medicine.form);
      Object.assign(this.selectedPk, this.medicine.packaging);
      Object.assign(this.selectedDosage, this.medicine.dosage);
    }, 0);
  }
});
</script>

<style scoped>

</style>
