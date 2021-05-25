<template>
  <q-card>
    <q-card-section>
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
    <q-card-section>
      <h2 class="text-h5 text-grey-14">Toutes les unités</h2>
      <q-tree
        :nodes="unitNodes(cloneDeep(units), 0)"
        node-key="id"
        selected-color="secondary"
        text-color="grey-14"
        v-model:selected="selected"
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
              v-for="(op, index) in operations"
              :key="index"
              @click="$emit(op.name, node.id)"
              flat
              round
              :color="op.color"
              size="md"
              :icon="op.icon"
            >
              <q-tooltip
                :class="`bg-${op.color}`"
                style="font-size: 16px"
                :offset="[10, 10]"
              >
                {{ op.tooltip }}
              </q-tooltip>
            </q-btn>
          </div>
        </template>
      </q-tree>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from 'vue';
import { cloneDeep } from 'lodash';
import {Arbre, unitNodes} from '../../graphql/unit/units/units.service';
import {Unit} from '../../graphql/types';

export default defineComponent({
  name: 'UnitList',
  emits: ['add', 'edit', 'delete'],
  props: {
    units: Array as PropType<Unit[]>
  },
  setup() {
    return {
      selected: ref<number>(1),
      filter: ref(''),
      unitNodes,
      cloneDeep,
      filterMethod(node: Arbre, filter: string) {
        return (
          node.label &&
          node.label.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      },
      operations: [
        {
          name: 'add',
          icon: 'add',
          color: 'primary',
          tooltip: 'Plus sous-unité',
        },
        {
          name: 'edit',
          icon: 'edit',
          color: 'positive',
          tooltip: 'Modifier',
        },
        {
          name: 'delete',
          icon: 'delete_forever',
          color: 'deep-orange',
          tooltip: 'Supprimer',
        }
      ]
    };
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.q-tree) {
  .q-tree__node--child {
    .q-tree__node-header {
      padding-left: 0;
    }
  }
}
</style>
