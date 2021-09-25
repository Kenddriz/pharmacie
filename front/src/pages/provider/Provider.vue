<template>
  <q-page class="row justify-center items-start q-pa-sm q-gutter-x-xs">
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
      card-container-class="fa-border items-start"
      no-data-label="Aucune page trouvé..."
      hide-pagination
      :loading="ppLoading"
      :style="`height:${$q.screen.height - 118}px`"
    >
      <template v-slot:top>
        <div class="column full-width q-gutter-xs">
          <div class="row q-gutter-sm">
            <q-toolbar-title class="text-bold">Mes fournisseurs</q-toolbar-title>
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
            align="left"
            style="font-weight: bold"
          >
            Actions
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
        <q-tr no-hover v-show="props.expand" :props="props">
          <q-td no-hover colspan="100%">
            <ProviderCommands
              :expand="props.expand"
              :provider="props.row"
              @add="openAddCmdDialog(props.row)"
              @more="openMoreCmdDialog($event)"
            />
          </q-td>
        </q-tr>
      </template>
      <!-- Card body for Grid view mod -->
      <template v-slot:item="props">
        <CardItem @edit="setUpdateInput($event)" :provider="props.row"/>
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
    <!---update provider --->
    <q-dialog v-model="show">
      <ProviderForm
        mode="update"
        style="min-width: 400px"
        :model-value="updateInput"
        @submit="updateProvider($event)"
      />
    </q-dialog>
    <!---add command--->
    <q-dialog
      full-width
      full-height
      v-model="addCmdDialog.show"
    >
      <q-card>
        <q-card-section>
          <AddCommand :provider="addCmdDialog.provider">
            <template v-slot:end>
              <q-btn unelevated icon="close" text-color="red" @click="addCmdDialog.show = false" />
            </template>
          </AddCommand>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--command details-->
    <q-dialog
      full-width
      full-height
      v-model="moreCmdDialog.show"
      v-if="moreCmdDialog.command"
    >
      <q-card>
        <q-bar class="bg-primary text-white">
          <q-icon size="md" name="person" />
          <div class="text-h6">
            {{moreCmdDialog.command?.provider.name}} - {{moreCmdDialog.command?.provider.address}}
          </div>
          <q-space />
          <q-btn v-close-popup color="red" flat round icon="close" />
        </q-bar>
        <q-card-section>
          <CommandLineDetails
            v-if="moreCmdDialog.command?.invoice"
            :command="moreCmdDialog.command"
          />
          <UpdateCommand
            v-else
            :command="moreCmdDialog.command"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import ProviderForm from '../../components/provider/ProviderForm.vue';
import CardItem from '../../components/provider/CardItem.vue';
import ProviderCommands from '../../components/provider/ProviderCommands.vue';
import { columns } from '../../components/provider/columns';
import { usePaginateProviders, useSaveProvider } from '../../graphql/provider/provider.service';
import AddCommand from '../../components/command/AddCommand.vue';
import { Command, Provider } from '../../graphql/types';
import UpdateCommand from '../../components/command/UpdateCommand.vue';
import CommandLineDetails from '../../components/command-line/CommandLineDetails.vue';

export default defineComponent({
  name: 'Provider',
  components: {
    ProviderForm,
    CardItem,
    ProviderCommands,
    AddCommand,
    UpdateCommand,
    CommandLineDetails
  },
  setup() {
    const addCmdDialog = reactive<{show: boolean; provider: Provider|null}>({
      show: false,
      provider: null
    });
    function openAddCmdDialog(provider: Provider) {
      addCmdDialog.provider = provider;
      addCmdDialog.show = true;
    }

    const moreCmdDialog = reactive<{show: boolean; command: Command|null}>({
      show: false,
      command: null
    });
    function openMoreCmdDialog(command: Command) {
      moreCmdDialog.command = command;
      moreCmdDialog.show = true;
    }

    return {
      isGrid: ref<boolean>(false),
      openAddCmdDialog,
      addCmdDialog,
      moreCmdDialog,
      openMoreCmdDialog,
      viewModeOptions: [
        { value: false, slot: 'false' },
        { value: true, slot: 'true' }
      ],
      columns,
      ...usePaginateProviders(),
      ...useSaveProvider()
    }
  }
})
</script>

<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: #c1f4cd

  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
</style>
