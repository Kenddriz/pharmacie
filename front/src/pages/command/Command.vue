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
            <q-tab-panel name="add" class="q-pa-none">
              <ScrollArea :style="heightStyle" class="q-pa-md">
                <AddCommandTab />
              </ScrollArea>
            </q-tab-panel>

            <q-tab-panel name="update" class="q-pa-none">
              <div v-if="pcLoading" :style="heightStyle" class="row items-center justify-center">
                <q-spinner-ios size="8em" color="secondary" />
              </div>
              <ScrollArea
                v-else-if="selectedCmd.length"
                class="q-pa-sm"
                :style="heightStyle"
              >
                <q-list dense class="q-mb-md">
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
                        <q-item-section class="q-mt-sm">
                          <q-item-label>Date de commande</q-item-label>
                          <q-item-label caption>
                            {{ formatDate(selectedCmd[0].createdAt, 'DATE_TIME') }}
                          </q-item-label>
                        </q-item-section>
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
              </ScrollArea>
              <div
                v-show="!selectedCmd.length && !pcLoading"
                :style="heightStyle"
                class="row items-center justify-center"
              >
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
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="delivery" class="q-pa-sm">
          <div>Détails de livraison</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
    <div class="col-12 col-md-3">
      <div class="text-h6 text-center">Liste de commandes</div>
      <q-list
        ref="scrollTargetRef"
        :style="`max-height: ${$q.screen.height - 150}px`"
        class="scroll-y"
        separator
      >
        <q-item
          clickable
          v-ripple v-for="(cmd, i) in commands.items"
          :key="i"
          @click="setSelectedCmd(i); tab = 'update'"
          :active="cmd.id === selectedCmd[0].id"
          :active-class="cmd.id === selectedCmd[0].id ? 'bg-brown-1' : ''"
        >
          <q-item-section avatar>
            <q-avatar size="sm" color="primary" text-color="white">
              {{cmd.provider.name.charAt(0).toUpperCase()}}
            </q-avatar>
          </q-item-section>
          <q-item-section>{{cmd.provider.name}}</q-item-section>
          <q-item-section>{{formatDate(cmd.provider.createdAt, 'DATE_ONLY')}}</q-item-section>
          <q-item-section top side>
            <q-item-label caption>
              livrée
            </q-item-label>
            <q-icon size="xs" v-if="cmd.invoice" color="positive" name="done" />
            <q-icon size="xs" v-else color="warning" name="remove_done" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { formatDate } from '../../shared/date';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import { usePaginateCommands } from '../../graphql/command/command.service';
import AddCommandTab from '../../components/command/AddCommandTab.vue';
import UpdateCommand from '../../components/command/UpdateCommand.vue';
import CardProvider from '../../components/provider/CardProvider.vue';
import CommandLineDetails from '../../components/command-line/CommandLineDetails.vue'
import UpdateProviderAvatar from '../../components/provider/UpdateProviderAvatar.vue';

export default defineComponent({
  name: 'Command',
  components: {
    ScrollArea,
    CardProvider,
    AddCommandTab,
    UpdateCommand,
    CommandLineDetails,
    UpdateProviderAvatar
  },
  setup() {
    return {
      deliveryPan: ref<string>('command'),
      tab: ref<string>('update'),
      formatDate,
      ...usePaginateCommands(),
      heightStyle: `height:${screen.height - 210}px`
    }
  }
});
</script>

<style scoped>

</style>
