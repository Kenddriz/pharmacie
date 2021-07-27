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
        :loading="providersLoading"
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
                <ContactTypeList class="q-pt-sm" :contacts="contacts(props.row.contacts)" />
              </q-menu>
            </q-btn>
          </q-td>
        </template>
      </q-table>
      <q-stepper-navigation>
        <q-btn
          no-caps
          :loading="createCmdLoading||updateCmdLoading"
          unelevated
          :disable="!selectedProvider.length"
          color="primary"
          :label="`${createdCmd === 0 ? 'Créer la commande et ' : ''}continuer`"
          @click="submitCreateCmd"
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
        <CommandLineRow
          :commandId="createdCmd"
          :medicines="medicines"
          :forms="forms"
          :units="units"
          :path-to-child="pathToChild"
          @submitted="submitted"
        />
        </tbody>
      </q-markup-table>

      <q-stepper-navigation>
        <q-btn
          flat
          @click="step = 1"
          color="primary"
          label="Retour"
          class="q-ml-sm"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { cmData } from './cmData';
import { Form, Medicine, Provider, Unit } from '../../graphql/types';
import CommandLineRow from './CommandLineRow.vue';
import { cmdProviderCol } from '../provider/table/columns';
import { useProviders } from '../../graphql/provider/read/providers.service';
import ContactTypeList from '../contactType/ContactTypeList.vue';
import { useCreateCommand } from '../../graphql/command/create/create.command.service';
import { useUpdateCommand } from '../../graphql/command/update/update.command.service';

export default defineComponent({
  name: 'AddCommandLine',
  components: {CommandLineRow, ContactTypeList},
  props: {
    medicines: {
      type: Array as PropType<Medicine[]>,
      required: true
    },
    forms: {
      type: Array as PropType<Form[]>,
      required: true
    },
    units: {
      type: Array as PropType<Unit[]>,
      required: true
    },
    pathToChild: {
      type: Function,
      required: true
    },
    contacts: {
      type: Function,
      required: true
    },
  },
  setup() {
    const {createCmdLoading, createCommand, createdCmd } = useCreateCommand();
    const { updateCmdLoading, updateCommand, updateCmdInput } = useUpdateCommand()
    const step = ref<number>(1);
    const selectedProvider = ref<Provider[]>([]);
    return {
      cmData,
      step,
      selectedProvider,
      filter: ref<string>(''),
      cmdProviderCol,
      ...useProviders(),
      selectedRowLabel: (count: number) => {
        return count + ' fournisseur séléctionné'
      },
      paginationLabel: (firstRowIndex: number, endRowIndex: number, totalRowsNumber: number) => {
        return firstRowIndex + '-' + endRowIndex + ' de ' + totalRowsNumber
      },
      createCmdLoading, createdCmd, updateCmdLoading,
      submitCreateCmd: async () => {
        if(createdCmd.value === 0)
          await createCommand(selectedProvider.value[0].id);
        else {
          updateCmdInput.providerId = selectedProvider.value[0].id;
          updateCmdInput.id = createdCmd.value;
          await updateCommand()
        }
        step.value = 2;
      },
      submitted: () => {
        selectedProvider.value.length = 0;
        createdCmd.value = 0;
        step.value = 1;
      }
    }
  }
});
</script>
