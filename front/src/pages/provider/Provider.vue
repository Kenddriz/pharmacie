<template>
  <q-page class="row justify-center items-start q-pa-md">
    <ProviderForm square flat class="col-12 col-md-3" @submit="createProvider($event)" />
    <q-table
      square
      bordered
      :grid="isGrid"
      :rows="providers"
      :columns="columns"
      :pagination="{page: 1, rowsPerPage: 10}"
      row-key="id"
      flat
      class="col"
      card-container-class="fa-border items-start"
      no-data-label="Aucune page trouvé..."
    >
      <template v-slot:top>
        <div class="column full-width q-gutter-xs">
          <div class="row q-gutter-sm">
            <q-toolbar-title class="text-bold">Mes fournisseurs</q-toolbar-title>
            <q-space />
            <q-input
              model-value=""
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
            <q-btn-toggle
              :model-value="isGrid"
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
          <q-td no-hover colspan="100%">
            Courbe commande: {{ props.row.name }}.
          </q-td>
        </q-tr>
      </template>

      <!-- Card body for Grid view mod -->

      <template v-slot:item="props">
        <CardItem @edit="setUpdateInput($event)" :provider="props.row"/>
      </template>

      <!-- //pagination -->
      <template v-slot:bottom>
        <div class="row full-width justify-center">
        </div>
      </template>
    </q-table>
    <q-dialog v-model="show">
      <ProviderForm
        mode="update"
        style="min-width: 400px"
        :model-value="updateInput"
        @submit="updateProvider($event)"
      />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import ProviderForm from '../../components/provider/ProviderForm.vue';
  import CardItem from '../../components/provider/CardItem.vue';
  import { columns } from '../../components/provider/columns';
  import { useProviders, useSaveProvider } from '../../graphql/provider/provider.service';

  export default defineComponent({
    name: 'Provider',
    components: { ProviderForm, CardItem },
    setup() {
      return {
        isGrid: ref<boolean>(false),
        viewModeOptions: [
          { value: false, slot: 'false' },
          { value: true, slot: 'true' }
        ],
        columns,
        ...useProviders(),
        ...useSaveProvider()
      }
    }
  })
</script>

<style scoped>

</style>
