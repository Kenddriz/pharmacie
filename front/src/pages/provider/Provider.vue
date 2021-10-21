<template>
  <q-page class="row justify-center items-start q-pa-xs q-gutter-x-xs">
    <ProviderForm
      square
      flat class="col-12 col-md-3"
      @submit="createProvider($event)"
    />
    <q-table
      square
      bordered
      :grid="isGrid"
      :rows="providers.items"
      :columns="columns"
      :pagination="{page: 1, rowsPerPage: paginateInput.limit}"
      row-key="id"
      flat
      class="col sticky-header-table"
      card-container-class="fa-border items-center q-card--bordered"
      card-container-style="overflow: scroll;"
      no-data-label="Aucune page trouvé..."
      hide-pagination
      :loading="ppLoading"
      :style="`height:${$q.screen.height - 80}px;`"
      loading-label="Chargement des données"
      table-style="overflow-x:hidden"
    >
      <template v-slot:top>
        <div class="column full-width q-gutter-xs">
          <div class="row q-gutter-sm">
            <div class="text-bold text-h6 text-blue-grey-14">Mes fournisseurs</div>
            <q-space />
            <q-input
              :model-value="paginateInput.keyword"
              v-model="paginateInput.keyword"
              dense
              debounce="100"
              class="col-xs-12 col-md-4 col-lg-3"
              color="primary"
              label="Chercher ..."
              @keydown.enter="searchProvider"
            >
              <template v-slot:append>
                <q-btn
                  @click="searchProvider"
                  unelevated
                  icon="search"
                  label="Envoyer"
                  no-caps
                />
              </template>
            </q-input>
          </div>
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
      </template>
      <template v-slot:header="props">
        <q-tr no-hover :props="props">
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
            style="font-weight: bold"
          >
            Suppression
          </q-th>
        </q-tr>
      </template>
      <!-- Table body for table view mod-->
      <template v-slot:body="props">
        <q-tr no-hover :props="props">
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
            class="text-blue-grey-14"
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
          <q-td align="center" auto-width>
            <q-btn
              flat
              icon="delete"
              size="md"
              round
              color="deep-orange"
              @click="openSoftRemoveProvider(props.row)"
            />
          </q-td>
        </q-tr>
        <q-tr no-hover v-if="props.expand" :props="props">
          <q-td no-hover colspan="100%">
            <ProviderCommands
              :provider-id="props.row.id"
              @add="openAddCmdDialog(props.row)"
              @more="openCommandDetails($event)"
            />
          </q-td>
        </q-tr>
      </template>
      <!-- Card body for Grid view mod -->
      <template v-slot:item="props">
        <CardItem
          @edit="updateProvider($event)"
          :provider="props.row"
        />
      </template>
      <!-- //pagination -->
      <template v-if="providers.meta.totalPages > 1" v-slot:bottom>
        <div class="row full-width justify-center">
          <q-pagination
            :model-value="providers.meta.currentPage"
            v-model="paginateInput.page"
            color="black"
            :max="providers.meta.totalPages"
            :max-pages="providers.meta.itemsPerPage"
            :boundary-numbers="false"
            @update:model-value="searchProvider"
          />
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProviderForm from '../../components/provider/ProviderForm.vue';
import CardItem from '../../components/provider/CardItem.vue';
import ProviderCommands from '../../components/provider/ProviderCommands.vue';
import { columns } from '../../components/provider/columns';
import { usePaginateProviders, useSaveProvider } from '../../graphql/provider/provider.service';
import AddProviderCommand from '../../components/provider/AddProviderCommand.vue';
import ProviderCommandDetails from '../../components/provider/ProviderCommandDetails.vue';
import { Command, Provider } from '../../graphql/types';
import { useQuasar } from 'quasar';
import SoftRemoveProvider from '../../components/provider/SoftRemoveProvider.vue';
import UpdateProvider from '../../components/provider/UpdateProvider.vue';

export default defineComponent({
  name: 'Provider',
  components: {
    ProviderForm,
    CardItem,
    ProviderCommands
  },
  setup() {

    const { dialog } = useQuasar();
    function openCommandDetails(command: Command) {
      dialog({
        component: ProviderCommandDetails,
        componentProps: { command }
      })
    }
    const { createProvider } = useSaveProvider();
    return {
      isGrid: ref<boolean>(false),
      openAddCmdDialog: (provider: Provider) => {
        dialog({
          component: AddProviderCommand,
          componentProps: { provider }
        })
      },
      openCommandDetails,
      openSoftRemoveProvider: (provider: Provider) => {
        dialog({
          component: SoftRemoveProvider,
          componentProps: { id: provider.id, name: provider.name }
        }).onOk((command: Command) => openCommandDetails(command));
      },
      viewModeOptions: [
        { value: false, slot: 'false' },
        { value: true, slot: 'true' }
      ],
      columns,
      ...usePaginateProviders(),
      createProvider,
      updateProvider: (provider: Provider) => {
        dialog({
          component: UpdateProvider,
          componentProps: { provider }
        })
      }
    }
  }
})
</script>
