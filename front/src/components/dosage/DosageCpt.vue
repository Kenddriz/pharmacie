<template>
  <ScrollArea style="height: calc(100vh - 172px);">
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
          <q-card v-for="(u, i) in ds.children" :key="i">
            <q-card-section class="text-center">{{u.label}}</q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn-group flat>
                <q-btn text-color="secondary" icon="edit">
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
      </q-step>
    </q-stepper>
  </ScrollArea>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn fab-mini icon="add" color="secondary">
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
import { useDosages, useSaveDosage } from '../../graphql/dosage/dosage.service';
import DosageForm from './DosageForm.vue';
import ScrollArea from '../shared/ScrollArea.vue';

export default defineComponent({
  name: 'DosageCpt',
  components: { DosageForm, ScrollArea },
  emits: ['remove'],
  setup(){
    const { listLoading, dosages } = useDosages();
    return {
      listLoading,
      dosages,
      ...useSaveDosage(),
      step: ref<number>(0),
      indexToMove: ref<number>(-1)
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
    async update(index: number) {
      const {id, parentId} = this.dosages[this.step].children[index];
      Object.assign(this.dosageInput, {id, parentId});
      await this.saveDosage();
      this.resetInput();
    }
  }
});
</script>

<style scoped>

</style>
