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
            <q-spinner-ios color="deep-orange" v-if="loadList||loadUpdate||loadCreation" />
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
    <ScrollArea style="height: calc(100vh - 192px);">
      <q-card-section class="q-pb-none">
        <ScrollArea v-for="(p, index) in packagingList" :key="index" style="height: 70px; max-width: 100%;">
          <div class="flex items-center q-pa-none no-wrap q-gutter-sm">
            <q-fab
              icon="more_vert"
              class="q-ml-md"
              text-color="deep-orange"
              direction="right"
              padding="xs"
            >
              <q-fab-action padding="5px" @click="addUnit(index)" color="positive" icon="add"  />
              <q-fab-action padding="5px" color="red" icon="delete" />
            </q-fab>
            <q-slide-item
              class="slide no-wrap"
              v-for="(unit, i) in p.units"
              :key="i"
              :ref="`${index}${i}`"
              left-color="brown"
              right-color="brown"
            >
              <template v-for="position in ['left', 'right']" v-slot:[position] :key="position">
                <div class="row no-wrap q-gutter-sm">
                  <q-icon
                    color="red-12"
                    name="close"
                    @click="$refs[`${index}${i}`].reset()"
                    class="cursor-pointer"
                  />
                  <q-btn size="sm" dense unelevated outline color="white" icon="edit">
                    <q-menu>
                      <q-list dense>
                        <q-item>
                          <q-input
                            label="Libellé"
                            :model-value="unit.label"
                            v-model="unit.label"
                            dense
                          />
                        </q-item>
                        <q-item>
                          <q-input
                            type="number"
                            min="1"
                            label="Multiplicité"
                            :model-value="unit.multiplicity"
                            v-model.number="unit.multiplicity"
                            dense
                          />
                        </q-item>
                        <q-item>
                          <q-item-section v-close-popup>
                            <q-btn
                              @click="updatePackage(index); $refs[`${index}${i}`].reset()"
                              dense
                              icon="save"
                              rounded
                              flat
                              color="amber"
                            />
                          </q-item-section>
                          <q-item-section v-close-popup>
                            <q-btn
                              @click="$refs[`${index}${i}`].reset()"
                              dense
                              icon="close"
                              rounded
                              flat
                              color="amber"
                            />
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <q-icon
                    @click="removeUnit(index, i)"
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
                <q-item-section v-if="p.units[i + 1]" side>
                  <q-item-label class="q-mt-md">=</q-item-label>
                </q-item-section>
              </q-item>
            </q-slide-item>
          </div>
          <q-separator class="q-mt-sm" inset/>
        </ScrollArea>
      </q-card-section>
      <!---add line --->
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
        <q-btn no-caps outline color="secondary" label="Nouvelle ligne d'unités" icon="add">
          <q-menu>
            <q-list dense>
              <q-item>
                <q-input
                  :model-value="unit.label"
                  v-model.trim="unit.label"
                  dense
                  label="Libellé"
                />
              </q-item>
              <q-item>
                <q-input
                  type="number"
                  :model-value="unit.multiplicity"
                  v-model.trim="unit.multiplicity"
                  dense
                  label="Multiplicité"
                />
              </q-item>
              <q-item>
                <q-item-section>
                  <q-btn
                    @click="creationInput.push({...unit})"
                    color="secondary"
                    no-caps
                    dense
                    rounded
                    outline
                    label="ok"
                  />
                </q-item-section>
                <q-item-section v-close-popup>
                  <q-btn color="secondary" no-caps dense rounded outline label="annuler" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          @click="submitCreation"
          no-caps outline
          color="positive"
          label="Enregistrer"
          icon="save"
          :disable="!creationInput.length"
        />
      </q-card-actions>
    </ScrollArea>
  </q-card>
</template>

<script lang="ts">
import ScrollArea from '../shared/ScrollArea.vue';
import {useCreatePackaging, useListPackaging} from '../../graphql/packaging/packaging.service';

export default {
  name: 'ConditioningComponent',
  components: { ScrollArea },
  setup() {
    return {
      ...useListPackaging(),
      ...useCreatePackaging()
    }
  }
}
</script>

<style lang="scss" scoped>
 .slide {
   min-width: 120px;height: 50px;
   &:hover {
     border: 1px solid gainsboro;
   }
 }
 .new-unit {
   border: 1px solid var(--q-info);
   border-radius: 25px;
   margin-top: 2px;
   margin-left: 5px;
   margin-right: 5px;
 }
</style>
