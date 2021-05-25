<template>
  <q-table
    square
    bordered
    :grid="isGrid"
    :rows="providers"
    :columns="columns"
    :pagination="{page: 1, rowsPerPage: 10}"
    row-key="name"
    flat
    class="sticky-column-table sticky-header-table"
    card-container-class="fa-border"
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
      <ProviderRows :item="props" />
    </template>

    <!-- Card body for Grid view mod -->

    <template v-slot:item="props">
      <CardItem :item="props" />
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
  import ProviderRows from './ProviderRows.vue';
  import CardItem from './CardItem.vue';

  export default defineComponent({
    name: 'ProviderTable',
    components: { ProviderRows, CardItem },
    setup() {
        const { contactTypes, loading: cTypesLoading } = useContactTypes();
        return {
          isGrid: ref<boolean>(false),
          viewModeOptions: [
            { value: false, slot: 'false' },
            { value: true, slot: 'true' }
          ],
          contactTypes,
          cTypesLoading,
          ...useProviders()
        }
    }
  })
</script>

<style scoped>

</style>
