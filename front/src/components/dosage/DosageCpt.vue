<template>
  <q-stepper
    v-if="dosages.length"
    v-model="step"
    vertical
    header-nav
    color="primary"
    animated
    flat
    keep-alive
    @transition="onMove"
    style="height: calc(100vh - 160px);"
    swipeable
  >
    <q-step
      v-for="(ds, index) in dosages"
      :key="index"
      :name="index"
      :title="ds.label"
      icon="settings"
      active-icon="add"
    >
      <div class="row wrap q-gutter-md q-pa-md">
        <q-btn icon-right="add" fab-mini text-color="primary">
          <DosageForm
            v-model="dosageInput.label"
            @submit="addUnit(ds.id)"
            title="Unité"
            placeholder="ex: 50mg, 60ml,etc."
          />
        </q-btn>
        <q-card flat bordered v-for="(u, i) in ds.children" :key="i">
          <q-card-section class="text-center">{{u.label}}</q-card-section>
          <q-separator />
          <q-card-actions>
            <q-btn-group flat>
              <q-btn text-color="primary" icon="edit">
                <DosageForm
                  title="Mise à jour"
                  v-model="dosageInput.label"
                  @submit="update(i)"
                  @before-show="dosageInput.label = u.label"
                />
              </q-btn>
              <q-btn
                text-color="deep-orange"
                icon="delete_forever"
                @click="$emit('remove', [u.id, 'dosageId'])"
              />
              <q-btn
                :text-color="indexToMove === i ? 'positive' : 'dark'"
                icon="drive_file_move"
                @click="indexToMove = indexToMove > - 1 ? -1 : i"
              />
            </q-btn-group>
          </q-card-actions>
        </q-card>
      </div>
      <q-stepper-navigation class="q-gutter-x-md">
        <q-btn
          no-caps
          dense
          outline
          color="primary"
          label="Modifier ce type de mesure"
        >
          <DosageForm
            title="Mise à jour"
            v-model="dosageInput.label"
            @submit="update(index, false)"
            @before-show="dosageInput.label = ds.label"
          />
        </q-btn>
        <q-btn
          v-if="ds.children.length === 0"
          no-caps
          dense
          outline
          color="deep-orange"
          label="Supprimer ce type de mesure"
          @click="deleteDosage(ds.id)"
         />
      </q-stepper-navigation>
    </q-step>
  </q-stepper>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab-mini icon="add" color="primary">
      <DosageForm
        v-model="dosageInput.label"
        @submit="saveDosage"
        title="Type de mesure"
        placeholder="Ex: Volume"
      />
    </q-btn>
  </q-page-sticky>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useDeleteDosage, useDosages, useSaveDosage } from '../../graphql/dosage/dosage.service';
import DosageForm from './DosageForm.vue';

export default defineComponent({
  name: 'DosageCpt',
  components: { DosageForm },
  emits: ['remove'],
  setup(){
    const { listLoading, dosages } = useDosages();
    return {
      listLoading,
      dosages,
      ...useSaveDosage(),
      ...useDeleteDosage(),
      step: ref<number>(0),
      indexToMove: ref<number>(-1),
    };
  },
  methods: {
    async onMove(newVal: number, oldVal: number) {
      if(this.indexToMove > -1) {
        this.setDosage(this.dosages[oldVal].children[this.indexToMove]);
        this.dosageInput.parentId = this.dosages[newVal].id;
        await this.saveDosage();
        this.indexToMove = - 1;
        this.resetInput();
      }
    },
    async update(index: number, child = true) {
      const {id, parentId} = child ? this.dosages[this.step].children[index] : this.dosages[this.step];
      Object.assign(this.dosageInput, {id, parentId});
      await this.saveDosage();
      this.resetInput();
    }
  }
});
</script>

<style scoped>

</style>
