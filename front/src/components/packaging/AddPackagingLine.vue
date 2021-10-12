<template>
  <ScrollArea
    v-if="creationInput.length"
    style="height: 80px; max-width: 100%;"
    class="q-mr-lg q-ml-lg"
  >
    <div class="flex items-center q-pa-sm no-wrap q-gutter-sm new-unit">
      <q-item
        v-for="(p, index) in creationInput"
        :key="index"
      >
        <q-item-section>
          <q-item-label class="row no-wrap">
            {{p.label}}
            <q-icon
              @click="creationInput.splice(index, 1)"
              name="close"
              color="red"
              class="cursor-pointer q-ml-sm"
            />
          </q-item-label>
          <q-item-label caption>{{p.multiplicity}}</q-item-label>
        </q-item-section>
        <q-item-section v-if="creationInput[index + 1]" side>
          <q-item-label class="q-mt-md">=</q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </ScrollArea>
  <q-card-actions align="between" class="q-mt-none">
    <q-btn no-caps outline color="primary" label="Nouvelle ligne d'unités" icon="add">
      <q-menu anchor="top middle" self="bottom middle">
        <PackagingForm
          :unit="unit"
          @validate="creationInput.push({ ...$event })"
        />
      </q-menu>
    </q-btn>
    <q-btn
      @click="submitCreation"
      no-caps outline
      color="positive"
      label="Enregistrer"
      icon-right="save"
      :disable="!creationInput.length"
      :loading="loadCreation"
    />
  </q-card-actions>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PackagingForm from './PackagingForm.vue';
import { useCreatePackaging } from '../../graphql/packaging/packaging.service';
import ScrollArea from '../shared/ScrollArea.vue';

export default defineComponent({
  name: 'AddPackagingLine',
  components: { PackagingForm, ScrollArea },
  setup() {
    return {
      ...useCreatePackaging()
    }
  }
});
</script>

<style scoped>

</style>
