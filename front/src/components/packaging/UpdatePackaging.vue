<template>
  <div class="flex items-center q-pa-none no-wrap q-gutter-sm">
    <q-fab
      icon="more_vert"
      class="q-ml-md"
      text-color="deep-orange"
      direction="right"
      padding="xs"
    >
      <q-fab-action @click="dialog = true" padding="5px" color="positive" icon="add"  />
      <slot></slot>
    </q-fab>
    <q-slide-item
      class="slide no-wrap"
      v-for="(unit, i) in packaging.units"
      :key="i"
      :ref="`unit-${i}`"
      left-color="brown"
      right-color="brown"
    >
      <template v-for="position in ['left', 'right']" v-slot:[position] :key="position">
        <div class="row no-wrap q-gutter-sm">
          <q-icon
            color="red-12"
            name="close"
            @click="$refs[`unit-${i}`].reset()"
            class="cursor-pointer"
          />
          <q-btn size="sm" dense unelevated outline color="white" icon="edit">
            <q-menu>
              <PackagingForm
                :unit="unit"
                @validate="updateUnit(i, $event);$refs[`unit-${i}`].reset()"
                @close="$refs[`unit-${i}`].reset()"
              />
            </q-menu>
          </q-btn>
          <q-icon
            @click="removeUnit(i)"
            name="delete_forever"
            class="cursor-pointer"
          />
        </div>
      </template>

      <q-item>
        <q-item-section>
          <q-item-label> {{unit.label}}</q-item-label>
          <q-item-label caption>
            {{unit.multiplicity}}
          </q-item-label>
        </q-item-section>
        <q-item-section v-if="packaging.units[i + 1]" side>
          <q-item-label class="q-mt-md">=</q-item-label>
        </q-item-section>
      </q-item>
    </q-slide-item>
  </div>
  <q-dialog v-model="dialog">
    <q-card>
      <PackagingForm @validate="addUnit($event)" />
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue';
import { Packaging, Unit, UpdatePackagingInput } from '../../graphql/types';
import { useUpdatePackaging } from '../../graphql/packaging/packaging.service';
import PackagingForm from './PackagingForm.vue';

export default defineComponent({
  name: 'UpdatePackaging',
  components: { PackagingForm },
  props: {
    packaging: {
      type: Object as PropType<Packaging>,
      required: true
    }
  },
  setup(props) {
    const { updatePackage } = useUpdatePackaging();
    const packaging = reactive<UpdatePackagingInput>({
      id: props.packaging.id,
      units: props.packaging.units.map(u =>({label: u.label, multiplicity: u.multiplicity}))
    });
    function removeUnit(indexU: number) {
      packaging.units.splice(indexU, 1);
      updatePackage(packaging);
    }
    function updateUnit(index: number, unit: Unit) {
      Object.assign(packaging.units[index], unit);
      updatePackage(packaging);
    }
    function addUnit(unit: Unit) {
      packaging.units.push(unit);
      updatePackage(packaging);
    }
    return {
      removeUnit,
      updateUnit,
      dialog: ref<boolean>(false),
      addUnit
    }
  }
});
</script>

<style lang="scss" scoped>
  .slide {
    min-width: 120px;
    height: 50px;
    &:hover {
       border: 1px solid gainsboro;
     }
  }
</style>
