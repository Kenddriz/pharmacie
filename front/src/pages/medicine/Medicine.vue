<template>
  <div class="fit row justify-center q-mt-md content-center">
    <Alert
      v-for="index in 3"
      :key="index"
      label="TOTAL"
      :value="index"
    />
  </div>

  <q-table
    title="Treats"
    :rows="[]"
    :columns="MEDICINE_COLS"
    row-key="id"
    table-class="q-ma-md"
    class="q-ma-md"
    no-data-label="Aucun médicament disponible"
    separator="cell"
  >
    <template v-slot:header-cell="props">
      <q-th :props="props">
        {{ props.col.label }}
        <q-icon v-if="props.col.name !=='id'" name="border_color" size="xs" />
      </q-th>
    </template>

    <template v-slot:top>
      <q-toolbar-title>Mes médicaments</q-toolbar-title>
      <q-btn no-caps icon="add" color="primary" label="Nouveau" />
      <q-space />
      <q-input borderless dense debounce="300" color="primary">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:top-row>
      <MedicineRowForm />
    </template>
    <!--<template v-slot:body="props">
      <q-tr :props="props">
        <q-td key="desc" :props="props">
          {{ props.row.designation }}
          <q-popup-edit v-model="props.row.designation">
            <q-input v-model="props.row.designation" dense autofocus counter />
          </q-popup-edit>
        </q-td>
      </q-tr>
    </template>-->
  </q-table>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Alert from '../../components/shared/Alert.vue';
  import { MEDICINE_COLS } from '../../components/medicine/columns';
  import MedicineRowForm from '../../components/medicine/MedicineRowForm.vue';
  export default defineComponent({
    name: 'Medicine',
    components: { Alert, MedicineRowForm },
    setup() {
      return {
        MEDICINE_COLS
      }
    }
  });
</script>

<style scoped>

</style>
