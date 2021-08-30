<template>
  <q-stepper
    v-model="step"
    vertical
    color="dark"
    done-color="positive"
    animated
    keep-alive
    flat
  >
    <q-step
      :name="1"
      title="Choix de fournisseur"
      icon="settings"
      :done="step > 1"
    >
      <q-table
        flat
        title="Séléction du fournisseur"
        :rows="providers"
        :columns="cmdProviderCol"
        :filter="filter"
        row-key="id"
        selection="single"
        v-model:selected="selectedProvider"
        :selected-rows-label="selectedRowLabel"
        :pagination-label="paginationLabel"
        no-data-label="Aucun fournisseur"
        rows-per-page-label="Nombre d'enregistrements par page"
        :rows-per-page-options="[5,10,15,20]"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            :model-value="filter"
            v-model="filter"
            placeholder="Chercher"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-contacts="props">
          <q-td :props="props">
            {{props.row.contacts.slice(0, 2).map(c => c.label).join(' - ')}}
            <q-btn color="primary" icon="more_vert" flat>
              <q-menu anchor="center end" self="center end" auto-close>
                <ContactList class="q-pt-sm" :contacts="props.row.contacts" />
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-stepper-navigation>
        <q-btn
          no-caps
          unelevated
          :disable="!selectedProvider.length"
          color="primary"
          label="suivant"
          @click="step = 2"
        />
      </q-stepper-navigation>
    </q-step>

    <q-step
      :name="2"
      title="Liste de médicaments à commander"
      :caption="selectedProvider.length ? 'Chez ' + selectedProvider[0].name : ''"
      icon="create_new_folder"
      :done="step > 2"
    >
      <q-markup-table flat bordered separator="cell">
        <thead >
          <tr v-if="selectedProvider.length">
            <th colspan="7">
              <div class="row no-wrap items-center">
                <q-img
                  style="width: 70px"
                  :ratio="1"
                  class="rounded-borders"
                  src="register.jpg"
                />
                <div class="q-ml-md">
                  <div class="text-h4">{{selectedProvider[0].name}}</div>
                  <span>{{(selectedProvider[0].contacts.slice(0, 2).map(ct => ct.label).join(' - '))}}</span>
                </div>
              </div>
            </th>
          </tr>
          <tr>
            <th v-for="(col, index) in cmData" :key="index">{{col.label}}</th>
          </tr>
        </thead>
        <tbody>
          <CommandLineRow />
          <!--<tr v-for="(cmd, i) in createdCmd.commandLines" :key="i">
            <td>{{cmd.medicine}}</td>
            <td>{{cmd.form.label}}</td>
            <td>{{cmd.unit.label}}</td>
            <td>{{cmd.quantity}}</td>
            <td>{{cmd.price}}</td>
            <td>{{cmd.vat}}</td>
            <td></td>
          </tr>-->
        </tbody>
      </q-markup-table>

      <q-stepper-navigation>
        <q-btn
          v-for="(bn, index) in btnBack"
          :key="index"
          flat
          color="primary"
          :label="bn"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { cmData } from '../command-line/cmData';
import { Provider} from '../../graphql/types';
import { cmdProviderCol } from '../provider/columns';
import ContactList from '../contact/ContactList.vue';
import CommandLineRow from '../command-line/CommandLineRow.vue';

export default defineComponent({
  name: 'AddCommand',
  components: {ContactList, CommandLineRow},
  props: {
    providers: {
      type: Array as PropType<Provider[]>,
      required: true
    },
  },
  setup() {
    const step = ref<number>(1);
    const selectedProvider = ref<Provider[]>([]);
    return {
      cmData,
      step,
      selectedProvider,
      filter: ref<string>(''),
      cmdProviderCol,
      selectedRowLabel: (count: number) => {
        return count + ' fournisseur séléctionné'
      },
      paginationLabel: (firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => {
        return firstRowIndex + '-' + endRowIndex + ' de ' + totalRowsNumber
      },
      btnBack: ['Retour', 'Réinitialiser']
    }
  }
});
</script>
