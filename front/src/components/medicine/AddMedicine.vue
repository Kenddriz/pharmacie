<template>
  <q-btn
    class="q-ml-lg"
    round
    color="positive"
    size="xs"
    icon="add"
  >
    <q-menu>
      <MedicineForm
        :forms="forms"
        :selectedForm="selectedForm"
        :dosages="dosages"
        :selectedDosage="selectedDosage"
        :packaging="packagingList"
        :selectedPk="selectedPk"
        @submit="createMedicine(articleId, $event)"
      >
        Nouveau médicament
      </MedicineForm>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForms } from '../../graphql/form/form.service';
import { useDosages } from '../../graphql/dosage/dosage.service';
import { useListPackaging } from '../../graphql/packaging/packaging.service';
import { useCreateMedicine } from '../../graphql/medicine/medicine.service';
import MedicineForm from './MedicineForm.vue';

export default defineComponent({
  name: 'AddMedicine',
  components: {
    MedicineForm
  },
  props: {
    articleId: {
      type: Number,
      required: true
    }
  },
  setup() {
    return {
      ...useForms(),
      ...useDosages(),
      ...useListPackaging(),
      ...useCreateMedicine(),
    }
  }
});
</script>

<style scoped>

</style>
