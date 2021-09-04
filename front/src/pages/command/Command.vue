<template>
  <q-page class="row items-start q-pa-sm">
    <q-card bordered flat square class="col-12 col-md-9">
      <q-tab-panels v-model="deliveryPan" animated>
        <q-tab-panel name="command" class="q-pa-sm">
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
              <ScrollArea :style="`height:${$q.screen.height - 157}px`">
                <AddCommand :providers="providers" />
              </ScrollArea>
            </q-tab-panel>

            <q-tab-panel name="update" class="q-pa-none">
              <ScrollArea v-if="selectedCmd" :style="`height:${$q.screen.height - 157}px`">
                <UpdateCommand
                  :command="selectedCmd"
                  @deliver="deliveryPan = 'delivery'"
                />
              </ScrollArea>
            </q-tab-panel>
          </q-tab-panels>
        </q-tab-panel>

        <q-tab-panel name="delivery" class="q-pa-sm">
          <Delivery @back="deliveryPan = 'command'" />
        </q-tab-panel>
      </q-tab-panels>

    </q-card>
    <div class="col-12 col-md-3">
      <div class="text-h6 text-center">Liste des commandes</div>
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
          :active="cmd.id === selectedCmd?.id"
          :active-class="cmd.id === selectedCmd?.id ? 'bg-brown-1' : ''"
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
            <q-icon size="xs" v-if="cmd.delivery" color="positive" name="done" />
            <q-icon size="xs" v-else color="warning" name="remove_done" />
          </q-item-section>
        </q-item>
        <!--<q-infinite-scroll @load="setPage" :offset="$q.screen.height - 150" scroll-target="scrollTargetRef">
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>--->
      </q-list>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { formatDate } from '../../shared/date';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import { usePaginateCommands } from '../../graphql/command/command.service';
import AddCommand from '../../components/command/AddCommand.vue';
import { useProviders } from '../../graphql/provider/provider.service';
import UpdateCommand from '../../components/command/UpdateCommand.vue';
import Delivery from '../../components/delivery/Delivery.vue';

export default defineComponent({
  name: 'Command',
  components: { ScrollArea,  AddCommand, UpdateCommand, Delivery },
  setup() {
    return {
      deliveryPan: ref<string>('command'),
      tab: ref<string>('update'),
      formatDate,
      ...usePaginateCommands(),
      ...useProviders()
    }
  }
});
</script>

<style scoped>

</style>
