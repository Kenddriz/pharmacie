<template>
  <q-page class="row items-start q-pa-sm">
    <q-card bordered flat square class="col-12 col-md-9">
      <q-tabs
        v-model="tab"
        dense
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
        stretch
      >
        <q-tab name="add" label="Ajout" />
        <q-tab name="update" label="Commande" />
      </q-tabs>

      <q-separator />

      <q-tab-panels keep-alive swipeable v-model="tab" animated>
        <q-tab-panel name="add" class="q-pa-none">
          <ScrollArea :style="`height:${$q.screen.height - 157}px`">
            <AddCommandLine
              :medicines="medicines"
              :forms="forms"
              :units="units"
              :path-to-child="pathToChild"
              :contacts="contacts"
            />
          </ScrollArea>
        </q-tab-panel>

        <q-tab-panel name="update" class="q-pa-none">
          <ScrollArea v-if="selectedCmd" :style="`height:${$q.screen.height - 157}px`">
            <div class="row items-start justify-center q-mt-sm">
              <q-card bordered style="width: 400px">
                <q-card-section  class="text-center">
                  <p class="text-h5">{{selectedCmd.provider.name}}</p>
                  <p>{{selectedCmd.provider.address}}</p>
                </q-card-section>
                <q-separator inset />
                <q-card-section>
                  <ContactTypeList :contacts="contacts(selectedCmd.provider.contacts)" />
                </q-card-section>
              </q-card>
            </div>
            <UpdateCommandLine
              :medicines="medicines"
              :command="selectedCmd"
              :forms="forms"
              :units="units"
              :path-to-child="pathToChild"
              :find-unit="findUnit"
            />
          </ScrollArea>
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
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{cmd.provider.name.charAt(0).toUpperCase()}}
            </q-avatar>
          </q-item-section>
          <q-item-section>{{cmd.provider.name}}</q-item-section>
          <q-item-section>{{formatDate(cmd.provider.createdAt, 'DATE_ONLY')}}</q-item-section>
          <q-item-section>
            <q-item-label>
              arrivée
              <q-icon size="sm" v-if="cmd.arrived" color="positive" name="thumb_up_alt" />
              <q-icon size="sm" v-else color="warning" name="thumb_down_alt" />
            </q-item-label>
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
import { useMedicines } from '../../graphql/medicine/read/medicines.service';
import AddCommandLine from '../../components/command-line/AddCommandLine.vue';
import UpdateCommandLine from '../../components/command-line/UpdateCommandLine.vue';
import { usePaginateCommands } from '../../graphql/command/read/paginate-commands.service';
import { formatDate } from '../../shared/date';
import { useContactTypes } from '../../graphql/contact_type/read/contact.types.service';
import ScrollArea from '../../components/shared/ScrollArea.vue';
import { useForms } from '../../graphql/medicine-types/read/forms.service';
import { useUnits } from '../../graphql/unit/units/units.service';
import ContactTypeList from '../../components/contactType/ContactTypeList.vue';

export default defineComponent({
  name: 'Command',
  components: {AddCommandLine, UpdateCommandLine, ScrollArea, ContactTypeList},
  setup() {
    return {
      tab: ref<string>('update'),
      formatDate,
      ...useContactTypes(),
      ...useMedicines(),
      ...usePaginateCommands(),
      ...useForms(),
      ...useUnits()
    }
  }
});
</script>

<style scoped>

</style>
