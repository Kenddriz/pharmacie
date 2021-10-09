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
        :rows="providers.items"
        :columns="cmdProviderCol"
        row-key="id"
        selection="single"
        v-model:selected="selectedProvider"
        :selected-rows-label="selectedRowLabel"
        no-data-label="Aucun fournisseur"
        hide-pagination
        :pagination="{ page: 1, rowsPerPage: paginateInput.limit }"
        :loading="ppLoading"
        table-class="text-blue-grey-14"
        title-class="text-blue-grey-14"
      >
        <template v-slot:top-right>
          <q-input
            outlined
            dense
            debounce="300"
            :model-value="paginateInput.keyword"
            v-model="paginateInput.keyword"
            placeholder="Mot clé"
            @keyup.enter="searchProvider"
          >
            <template v-slot:after>
              <q-btn @click="searchProvider" icon="search" no-caps label="Chercher" />
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
      <AddCommand :provider="selectedProvider[0]" />
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
import { cmdProviderCol } from '../provider/columns';
import ContactList from '../contact/ContactList.vue';
import AddCommand from './AddCommand.vue';
import { usePaginateProviders } from '../../graphql/provider/provider.service';
import { getOneContact } from '../../graphql/utils/utils';

export default defineComponent({
  name: 'AddCommandTab',
  components: {ContactList, AddCommand},
  setup() {
    const step = ref<number>(1);
    return {
      step,
      ...usePaginateProviders(2),
      filter: ref<string>(''),
      cmdProviderCol,
      selectedRowLabel: (count: number) => {
        return count + ' fournisseur séléctionné'
      },
      getOneContact
    }
  }
});
</script>
