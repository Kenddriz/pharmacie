<template>
  <q-page class="row justify-center q-pa-md">
    <q-card class="col-12 col-md-11">
      <q-card-section class="q-pb-none">
        <q-input
          v-model="filter"
          dense
          ref="filterRef"
          label="Entrer un libellé poour filtrer"
          clear-icon="filter_alt"
          clearable
          class="q-mb-lg"
        >
          <template v-slot:prepend>
            <q-icon name="filter_alt" class="cursor-pointer" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-toolbar>
          <q-toolbar-title>Toutes les unités</q-toolbar-title>
          <q-space />
          <q-btn
            icon="add"
            label="Nouvelle unité principale"
            color="blue-12"
            @click="setPrentId(0)"
          />
        </q-toolbar>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-tree
          :nodes="unitNodes(cloneDeep(units), 0)"
          node-key="id"
          selected-color="amber"
          text-color="grey-14"
          v-model:selected="selected"
          accordion
          default-expand-all
          class="q-pr-md"
          :filter="filter"
          :filter-method="filterMethod"
        >
          <template v-slot:default-header="{ node }">
            <q-icon
              name="account_tree"
              size="20px"
              class="q-mr-sm"
            />
            {{ node.label }}, N°{{ node.id }}
            <q-badge color="info" floating transparent>
              {{ node.children.length }}
              <q-tooltip
                anchor="top right"
                self="center left"
                style="font-size: 16px"
                :offset="[3, 0]"
              >
                sous-unité : {{ node.children.length }}
              </q-tooltip>
            </q-badge>
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
                @click="setUpateInput(node)"
              />
              <q-btn
                size="md"
                round
                color="deep-orange"
                flat
                icon="delete_forever"
                :disable="node.children.length > 0"
              />
            </div>
          </template>
        </q-tree>
      </q-card-section>
    </q-card>

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
      submit-label="Modifier"
      @submit="updateUnit"
    />
  </q-page>
</template>

<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import { Arbre, unitNodes, useUnits } from '../../graphql/unit/units/units.service';
  import {cloneDeep} from 'lodash';
  import UnitForm from '../../components/unit/UnitForm.vue';
  import { createUnitService } from '../../graphql/unit/create/create.unit.service';
  import { updateUnitService } from '../../graphql/unit/update/update.unit.service';

  export default defineComponent({
    name: 'Unit',
    components: {
      CreateUnit: UnitForm,
      UpdateUnit: UnitForm
    },
    setup() {
      return {
        filter: ref(''),
        selected: ref<number>(1),
        ...useUnits(),
        unitNodes,
        cloneDeep,
        filterMethod(node: Arbre, filter: string) {
          return (
            node.label &&
            node.label.toLowerCase().indexOf(filter.toLowerCase()) > -1
          );
        },
        ...createUnitService(),
        ...updateUnitService()
      }
    }
  })
</script>

<style scoped>

</style>
