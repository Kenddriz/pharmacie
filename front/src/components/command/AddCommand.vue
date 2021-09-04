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
        row-key="id"
        selection="single"
        v-model:selected="selectedProvider"
        :selected-rows-label="selectedRowLabel"
        no-data-label="Aucun fournisseur"
        hide-pagination
        :pagination="{ page: 1, rowsPerPage: providers.length }"
        :loading="fpLoading"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            :model-value="fpInput"
            v-model="fpInput"
            placeholder="Mot clé"
            @keyup.enter="findProviders"
          >
            <template v-slot:after>
              <q-btn @click="findProviders" icon="search" no-caps label="Chercher" />
            </template>
          </q-input>
        </template>
        <template v-slot:body-cell-contacts="props">
          <q-td :props="props">
            {{getOneContact(props.row.contacts, true)}}
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
                  <span>{{getOneContact(selectedProvider[0].contacts)}}</span>
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
            :loading="ccLoading"
            @onSubmit="createCommand(selectedProvider[0].id, $event)"
          />
        </tbody>
      </q-markup-table>

      <q-stepper-navigation>
        <q-btn
          flat
          color="primary"
          label="Retour"
          class="q-ml-sm"
          @click="step = 1"
        />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cmData } from '../command-line/cmData';
import { Contact, Provider } from '../../graphql/types';
import { cmdProviderCol } from '../provider/columns';
import ContactList from '../contact/ContactList.vue';
import CommandLineRow from '../command-line/CommandLineRow.vue';
import { useFindProviders } from '../../graphql/provider/provider.service';
import { useCreateCommand } from '../../graphql/command/command.service';

export default defineComponent({
  name: 'AddCommand',
  components: {ContactList, CommandLineRow},
  setup() {
    const step = ref<number>(1);
    const selectedProvider = ref<Provider[]>([]);
    return {
      cmData,
      step,
      selectedProvider,
      ...useFindProviders(),
      filter: ref<string>(''),
      cmdProviderCol,
      selectedRowLabel: (count: number) => {
        return count + ' fournisseur séléctionné'
      },
      getOneContact: (contacts: Contact[], each = false) => {
        const list: string[] = [];
        for(const contact of contacts) {
          if(each && list.length)break;
          else if(contact.list.length)list.push(contact.list[0])
        }
        return list.length ? list.join(' - ') : 'aucun contact';
      },
      ...useCreateCommand()
    }
  }
});
</script>
