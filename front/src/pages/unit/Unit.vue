<template>
  <q-page class="row justify-center items-center">
    <q-splitter
      v-model="splitterModel"
      class="full-width"
      style="max-width: 1200px"
    >

      <template v-slot:before>
        <UnitList
          :units="units"
          class="q-ma-md"
          @edit="setInput($event, 1)"
          @add="setInput($event)"
        />
      </template>

      <template v-slot:separator>
        <q-avatar color="primary" text-color="white" size="40px" icon="drag_indicator" />
      </template>

      <template v-slot:after>
        <q-card square bordered class="q-ma-md">
          <q-card-section class="q-pb-none"  align="center">
            <q-tabs
              v-model="tab"
              no-caps
              dense
              class="bg-teal-1 text-grey"
              active-color="secondary"
              indicator-color="secondary"
              align="justify"
            >
              <q-tab
                v-for="(it, index) in modes"
                :key="index"
                :icon="it.icon"
                :name="index"
                :label="it.title"
                ripple
              />
            </q-tabs>
            <q-tab-panels class="bg-grey-1" v-model="tab" animated>
              <q-tab-panel :name="0">
                <CreateUnit v-model="createUnitInput" />
              </q-tab-panel>
              <q-tab-panel :name="1">
               <UpdateUnit v-model="updateUnitInput" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </q-card>
      </template>

    </q-splitter>
  </q-page>
</template>

<script lang="ts">
  import {defineComponent, ref, reactive} from 'vue';
  import UnitList from '../../components/unit/UnitList.vue';
  import CreateUnit from '../../components/unit/CreateUnit.vue';
  import UpdateUnit from '../../components/unit/UpdateUnit.vue';
  import { useUnits } from '../../graphql/unit/units/units.service';
  import {CreateUnitInput, UpdateUnitInput} from '../../graphql/types';
  import {cloneDeep} from 'lodash';
  import {defaultUnit} from '../../graphql/unit/unit';

  export default defineComponent({
    name: 'Unit',
    components: {UnitList, UpdateUnit, CreateUnit},
    setup() {
      const tab = ref<number>(0);
      const { units, findUnit } = useUnits();
      const updateUnitInput = reactive<UpdateUnitInput>({
        id: 0,
        ...cloneDeep(defaultUnit)
      });
      const createUnitInput = reactive<CreateUnitInput>(cloneDeep(defaultUnit));

      function setInput (i: number, mode = 0) {
        const { id, label, description, parentId } = findUnit(i);
        if(mode) Object.assign(updateUnitInput, { id, label, description, parentId });
        else {
          Object.assign(createUnitInput, cloneDeep(defaultUnit));
          createUnitInput.parentId = i;
        }
        tab.value = mode;
      }

      return {
        splitterModel: ref(50),
        modes: [
          {
            icon: 'add',
            title: 'Ajout'
          },
          {
            icon: 'update',
            title: 'Modification'
          }
        ],
        tab,
        units,
        setInput,
        updateUnitInput,
        createUnitInput
      }
    }
  })
</script>

<style scoped>

</style>
