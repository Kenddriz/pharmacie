<template>
  <q-card flat bordered>
    <q-card-section class="q-pa-xs">
      <q-item>
        <q-item-section side>
          <q-icon color="amber-12" size="md" name="door_sliding" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-bold">
            Conditionnements et unités de vente
            <q-spinner-ios color="deep-orange" v-if="loadList" />
          </q-item-label>
          <q-item-label caption>
            Glisser les éléments pour exécuter une opération
            <q-icon size="xs" name="arrow_forward" />
            <q-icon size="xs" name="arrow_back" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <ScrollArea style="height: calc(100vh - 160px);">
      <q-card-section class="q-pb-none">
        <ScrollArea
          v-for="(pk, index) in packagingList"
          :key="index" style="height: 70px; max-width: 100%;"
        >
          <UpdatePackaging :packaging="pk">
            <q-fab-action
              padding="5px"
              color="red"
              icon="delete"
              @click="$emit('remove', [pk.id, 'packagingId'])"
            />
          </UpdatePackaging>
          <q-separator class="q-mt-sm" inset/>
        </ScrollArea>
      </q-card-section>
      <!---add line --->
      <AddPackagingLine />
    </ScrollArea>
  </q-card>
</template>

<script lang="ts">
import ScrollArea from '../shared/ScrollArea.vue';
import {useListPackaging} from '../../graphql/packaging/packaging.service';
import AddPackagingLine from './AddPackagingLine.vue';
import UpdatePackaging from './UpdatePackaging.vue';

export default {
  name: 'ConditioningComponent',
  components: { ScrollArea, AddPackagingLine, UpdatePackaging },
  emits: ['remove'],
  setup() {
    return {
      ...useListPackaging()
    }
  }
}
</script>

<style lang="scss" scoped>
 .new-unit {
   border: 1px solid var(--q-info);
   border-radius: 25px;
   margin-top: 2px;
   margin-left: 5px;
   margin-right: 5px;
 }
</style>
