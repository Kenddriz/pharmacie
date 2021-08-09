<template>
  <q-card
    bordered
    flat square
  >
    <q-card-section class="q-pa-xs">
      <q-item>
        <q-item-section side>
          <q-icon color="amber-12" size="md" name="drive_file_move" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-bold">
            Dosage/Unités de mesure
            <q-spinner-ios color="deep-orange" v-if="dosageLoading||listLoading" />
          </q-item-label>
          <q-item-label caption>
            Les dosages sont déplaçables
            <q-icon size="xs" name="expand" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-separator />
    <ScrollArea style="height: calc(100vh - 192px);">
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
          v-for="(dosage, index) in dosages"
          :key="index"
          :name="index"
          :title="dosage.label"
          icon="settings"
          active-icon="add"
        >
          <div class="row wrap q-gutter-md q-pa-md">
            <q-btn icon-right="add" fab-mini text-color="primary">
              <DosageForm
                v-model="dosageInput.label"
                @submit="addUnit(dosage.id)"
                title="Unité"
                placeholder="ex: 50mg, 60ml,etc."
              />
            </q-btn>
            <q-card v-for="(u, i) in dosage.children" :key="i">
              <q-card-section class="text-center">{{u.label}}</q-card-section>
              <q-card-actions>
                <q-btn-group>
                  <q-btn icon="edit">
                    <DosageForm
                      title="Mise à jour"
                      v-model="dosageInput.label"
                      @submit="update(i)"
                      @before-show="dosageInput.label = u.label"
                    />
                  </q-btn>
                  <q-btn icon="delete_forever" />
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
  </q-card>
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
  name: 'DosageComponent',
  components: { DosageForm, ScrollArea },
  setup(){
    return {
      ...useDosages(),
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
