<template>
  <q-table
    square
    bordered
    :grid="isGrid"
    :rows="providers"
    :columns="columns"
    :pagination="{page: 1, rowsPerPage: 10}"
    row-key="id"
    flat
    class="sticky-column-table sticky-header-table"
    card-container-class="fa-border items-start"
    no-data-label="Aucune page trouvé..."
    :loading="cTypesLoading"
  >
    <template v-slot:top>
      <div class="column full-width q-gutter-xs">
        <div class="row q-gutter-sm">
          <q-toolbar-title class="text-bold">Mes fournisseurs</q-toolbar-title>
          <q-space />
          <q-input
            dense
            debounce="100"
            class="col-xs-12 col-md-3 col-lg-2"
            color="primary"
            label="Chercher ..."
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div class="row q-gutter-xs">
          <div>
            <q-btn-toggle
              class="border-primary"
              dense
              v-model="isGrid"
              text-color="primary"
              color="white"
              toggle-text-color="white"
              toggle-color="primary"
              unelevated
              no-caps
              :options="viewModeOptions"
            >
              <template v-slot:false>
                <q-icon name="view_list" />
              </template>
              <template v-slot:true>
                <q-icon name="apps" />
              </template>
            </q-btn-toggle>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th auto-width />
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          auto-width
          style="font-weight: bold"
        >
          {{ col.label }}
        </q-th>
        <q-th
          auto-width
          align="left"
          style="font-weight: bold"
        >
          Actions
        </q-th>
      </q-tr>
    </template>
    <!-- Table body for table view mod-->
    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td auto-width>
          <q-btn
            size="sm"
            color="positive"
            round
            dense
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'remove' : 'add'"
          />
        </q-td>
        <q-td
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
        >
          {{ col.value }}
        </q-td>
        <q-td auto-width>
          <q-btn icon="delete" size="sm" round color="warning" />
        </q-td>
      </q-tr>
      <q-tr v-show="props.expand" :props="props">
        <q-td colspan="100%">
          <div class="text-left">Courbe commande: {{ props.row.name }}.</div>
        </q-td>
      </q-tr>
    </template>

    <!-- Card body for Grid view mod -->

    <template v-slot:item="props">
      <CardItem
        :item="props"
        :contacts="contacts(props.row.contacts)"
      />
    </template>

    <!-- //pagination -->
    <template v-slot:bottom>
      <div class="row full-width justify-center">
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {useProviders} from '../../../graphql/provider/read/providers.service';
  import {useContactTypes} from '../../../graphql/contact_type/read/contact.types.service';
  import CardItem from './CardItem.vue';
  import { Contact, ContactType } from '../../../graphql/types';

  export default defineComponent({
    name: 'ProviderTable',
    components: { CardItem },
    setup() {
        const { contactTypes, loading: cTypesLoading } = useContactTypes();
        const contacts = (contacts: Contact[]) => {
          return contactTypes.value.map((cType: ContactType) => {
            return {
              ...cType,
              contacts: contacts.filter(c => c.contactTypeId === cType.id)
            }
          })
        };
        return {
          isGrid: ref<boolean>(false),
          viewModeOptions: [
            { value: false, slot: 'false' },
            { value: true, slot: 'true' }
          ],
          contacts,
          cTypesLoading,
          ...useProviders()
        }
    }
  })
</script>

<style scoped>

</style>
