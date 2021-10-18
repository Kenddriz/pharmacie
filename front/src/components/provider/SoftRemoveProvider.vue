<template>
  <q-dialog
    full-height
    ref="dialogRef"
  >
    <q-card style="width: 350px" square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px!important;">
          {{name}}
        </span>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section style="height: calc(100% - 35px)">
        <q-list v-if="commands.items.length || pcLoading" separator>
          <q-item
            clickable
            v-ripple
            v-for="(cmd, i) in commands.items"
            :key="i"
            @click="shoMore(cmd)"
          >
            <q-item-section>{{formatDate(provider.createdAt, 'DATE_ONLY')}}</q-item-section>
            <q-item-section v-if="(size = cmd.commandLines.length) !== undefined" side>
              {{size}} ligne{{size > 1 ? 's' : ''}}
            </q-item-section>
            <q-item-section top side>
              <q-item-label caption>
                livrée
              </q-item-label>
              <q-icon size="xs" v-if="cmd.invoice" color="positive" name="done" />
              <q-icon size="xs" v-else color="warning" name="remove_done" />
            </q-item-section>
          </q-item>
        </q-list>
        <template v-if="(total = commands.meta.totalItems && !pcLoading)">
          <q-separator />
          <q-item>
            <q-pagination
              :model-value="input.page"
              :max="commands.meta.totalPages"
              v-model="input.page"
              input
            />
          </q-item>
          <q-item class="q-mt-lg">
            <q-item-section>
              <q-item-label>Vous ne pouvez pas supprimer ce fournisseur</q-item-label>
              <q-item-label caption>
                Vous lui avez effectué {{total}} commande{{total > 1 ? 's' : ''}} depuis sa création.
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <NoData :sizes="[95, 100]" :loading="pcLoading" :total-items="commands.meta.totalItems">
         <div class="text-body2">
          Aucune commande n'a été effectuée depuis sa création.
          <q-btn
            v-close-popup
            icon="delete_forever"
            flat
            color="red"
            label="Supprimer"
            @click="softRemoveProvider(provider.id)"
          />
        </div>
        </NoData>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, UnwrapRef } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useSoftRemoveProvider } from '../../graphql/provider/provider.service';
import { Command } from '../../graphql/types';
import { formatDate } from '../../shared/date';
import { usePaginateCommands } from '../../graphql/command/command.service';
import NoData from '../shared/NoData.vue';

export default defineComponent({
  name: 'SoftRemoveProvider',
  components: { NoData },
  props: {
    id: {
      type: Number,
      required: true
    },
    name: String
  },
  emits: ['ok'],
  setup(props) {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...usePaginateCommands(4, { year: new Date().getFullYear(), providerId: props.id }),
      formatDate,
      ...useSoftRemoveProvider()
    }
  },
  methods: {
    shoMore(cmd: UnwrapRef<Command> ) {
      Object.assign(this.selectedCmd[0], cmd);
      this.$emit('ok', this.selectedCmd[0]);/**emit selected reference to parent**/
    }
  }
});
</script>

<style scoped>

</style>
