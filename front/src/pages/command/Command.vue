<template>
  <q-page class="row items-start q-pa-sm text-blue-grey-14">
    <q-card bordered flat square class="col-12 col-md-9">
      <q-tab-panels v-model="deliveryPan" animated>
        <q-tab-panel name="command" class="q-pa-none">
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            stretch
            no-caps
          >
            <q-tab icon="add" name="add" label="Nouvelle commande" />
            <q-tab icon="toggle_on" name="update" label="Commande active" />
          </q-tabs>
          <q-separator />
          <q-tab-panels keep-alive swipeable v-model="tab" animated>
            <q-tab-panel :style="heightStyle" name="add" class="q-pa-sm">
              <AddCommandTab />
            </q-tab-panel>

            <q-tab-panel :style="heightStyle" name="update" class="q-pa-sm">
              <q-list dense v-if="selectedCmd.length" class="q-pb-sm">
                <q-expansion-item
                  expand-separator
                  icon="info"
                  label="Informations supplémentaires"
                  :caption="`Destination de la commande: ${selectedCmd[0].provider.name}`"
                >
                  <div class="row items-stretch q-pb-sm q-mt-sm justify-around">
                    <CardProvider flat :provider="selectedCmd[0].provider" />
                    <div class="col-sm-12 col-md-4">
                      <UpdateProviderAvatar
                        :avatar="selectedCmd[0].provider.avatar"
                        :provider-id="selectedCmd[0].provider.id"
                        height="190px"
                      />
                      <q-item class="q-mt-sm">
                        <q-item-section>
                          <q-item-label>Date de commande</q-item-label>
                          <q-item-label caption>
                            {{ formatDate(selectedCmd[0].createdAt, 'DATE_TIME') }}
                          </q-item-label>
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>N°Commande</q-item-label>
                          <q-item-label caption>
                            {{selectedCmd[0].id}}
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </div>
                  </div>
                </q-expansion-item>
                <q-expansion-item
                  default-opened
                  expand-separator
                  icon="receipt"
                  label="Contenu de la commande"
                  :caption="`Il y a ${selectedCmd[0].commandLines.length} ligne(s)`"
                >
                  <UpdateCommand
                    v-if="!selectedCmd[0].invoice"
                    :command="selectedCmd[0]"
                  />
                  <CommandLineDetails
                    v-else
                    :command="selectedCmd[0]"
                  />
                </q-expansion-item>
              </q-list>
              <NoData :sizes="[100, 150]" :total-items="commands.meta.totalItems" :loading="pcLoading">
                <div class="row items-center justify-center">
                  <div class="text-center">
                    <p class="text-h5">AUCUNE COMMANDE EFFECTUEE</p>
                    <q-btn
                      no-caps
                      outline
                      rounded
                      label="Passer une commande"
                      icon-right="send"
                      color="primary"
                      @click="tab = 'add'"
                    />
                  </div>
                </div>
              </NoData>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="col-12 col-md-3">
      <div class="text-h6 text-center">Liste de commandes</div>
      <CommandList
        :style="`height: ${$q.screen.height - 156}px;`"
        :commands="commands.items"
        :selected-id="selectedCmd[0]?.id"
        with-name
        @select="setSelectedCmd($event); tab = 'update'"
      />
      <div class="flex flex-center bordered-top bordered-bottom">
        <q-pagination
          :disable="commands.meta.totalItems <= 1"
          :model-value="input.page"
          :max="commands.meta.totalPages"
          v-model="input.page"
          input
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { formatDate } from '../../shared/date';
import { usePaginateCommands } from '../../graphql/command/command.service';
import AddCommandTab from '../../components/command/AddCommandTab.vue';
import UpdateCommand from '../../components/command/UpdateCommand.vue';
import CardProvider from '../../components/provider/CardProvider.vue';
import CommandLineDetails from '../../components/command-line/CommandLineDetails.vue'
import UpdateProviderAvatar from '../../components/provider/UpdateProviderAvatar.vue';
import CommandList from '../../components/command/CommandList.vue';
import NoData from '../../components/shared/NoData.vue';

export default defineComponent({
  name: 'Command',
  components: {
    CardProvider,
    AddCommandTab,
    UpdateCommand,
    CommandLineDetails,
    UpdateProviderAvatar,
    CommandList,
    NoData
  },
  setup() {
    return {
      deliveryPan: ref<string>('command'),
      tab: ref<string>('update'),
      formatDate,
      ...usePaginateCommands(),
      heightStyle: `height:${screen.height - 181}px;`
    }
  }
});
</script>

<style scoped>

</style>
