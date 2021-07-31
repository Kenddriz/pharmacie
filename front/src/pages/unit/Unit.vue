<template>
  <q-page class="row">
    <ScrollArea
      style="height: calc(100vh - 110px);"
      class="col-12 col-md-6 q-pa-md"
    >
      <q-list bordered separator>
        <q-expansion-item
          group="somegroup"
          icon="explore"
          label="Toutes les unités de vente"
          default-opened
          header-class="text-primary"
        >
          <q-btn
            no-caps
            class="q-ma-md"
            icon="add"
            label="unité principale"
            color="blue-12"
            @click="setPrentId(0)"
          />
          <q-tree
            class="q-ma-md"
            :nodes="unitNodes(cloneDeep(units), 0)"
            node-key="id"
            selected-color="amber"
            text-color="grey-14"
            v-model:selected="selected"
            accordion
          >
            <template v-slot:default-header="{ node }">
              <q-icon
                name="account_tree"
                size="20px"
                class="q-mr-sm"
              />
              {{ node.label }}, N°{{ node.id }}
            </template>
            <template v-slot:default-body="{ node }">
              <div class="row items-center justify-between q-pl-lg">
                <q-btn
                  size="md"
                  round
                  flat
                  icon="add"
                  color="primary"
                  @click="setPrentId(node.id)"
                />
                <q-btn
                  size="md"
                  icon="read_more"
                  round
                  flat
                  color="positive"
                  @click="setUpdateInput(node)"
                />
                <q-btn
                  size="md"
                  round
                  color="deep-orange"
                  flat
                  icon="delete_forever"
                  v-if="!node.children.length"
                />
              </div>
            </template>
          </q-tree>
        </q-expansion-item>

        <q-expansion-item
          group="somegroup"
          icon="sync_alt"
          label="Correspondance des unités"
          header-class="text-teal"
        >
          <div class="text-center text-caption">Exemple : 1m = 10dm = 100cm = ...</div>
          <q-separator inset spaced />
          <ScrollArea v-for="orphan in orphanUnits()" :key="orphan.id" style="height: 80px; max-width: 100%;">
            <div v-if="(uPaths = pathToChild(orphan.id)).length" class="flex flex-center no-wrap q-gutter-sm">
              <q-input
                type="number"
                min="1"
                v-for="(uPath, index) in uPaths" :key="index"
                input-style="width: 150px;"
                stack-label
                :model-value="uPath.multiplicity"
                :label="uPath.label"
                :suffix="`${uPaths[index + 1]? '=' : ''}`"
                @keyup="setMultiplicity(uPath, $event.target.value)"
              />
            </div>
            <q-separator class="q-mt-md" inset/>
          </ScrollArea>
        </q-expansion-item>
      </q-list>
    </ScrollArea>
    <MeasureComponent />
  </q-page>

  <!--dialog -->
  <CreateUnit
    :title="`${createInput.parentId > 0 ? `Unité mère : ${findUnit(createInput.parentId)?.label}` : 'Nouvelle unité primaire'}`"
    :model-value="createInput"
    :loading="createLoading"
    v-model:open="createDialog"
    submit-label="Ajouter"
    @submit="createUnit"
  />
  <!---update -->
  <UpdateUnit
    title="Mise à jour"
    :model-value="updateInput"
    :options="units.filter(u => u.id !== updateInput.id)"
    v-model:open="updateDialog"
    submit-label="Enregistrer"
    @submit="updateUnit"
  />
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import { unitNodes, useUnits } from '../../graphql/unit/units/units.service';
  import {cloneDeep} from 'lodash';
  import UnitForm from '../../components/sale-unit/UnitForm.vue';
  import { createUnitService } from '../../graphql/unit/create/create.unit.service';
  import { updateUnitService } from '../../graphql/unit/update/update.unit.service';
  import ScrollArea from '../../components/shared/ScrollArea.vue';
  import MeasureComponent from '../../components/measure/MeasureComponent.vue'

  export default defineComponent({
    name: 'Unit',
    components: {
      CreateUnit: UnitForm,
      UpdateUnit: UnitForm,
      ScrollArea,
      MeasureComponent
    },
    setup() {
      return {
        selected: ref<number>(1),
        ...useUnits(),
        unitNodes,
        cloneDeep,
        ...createUnitService(),
        ...updateUnitService()
      }
    }
  })
</script>

<style scoped>

</style>
