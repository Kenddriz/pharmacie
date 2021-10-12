<template>
  <q-dialog
    full-height
    ref="dialogRef"
  >
    <q-card style="width: 350px" square>
      <q-bar class="bg-teal-14 text-white">
        <span style="font-size: 12px!important;">
          {{provider.name}}
        </span>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip class="bg-white text-primary">Fermer</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section
        v-if="providerCommands.items.length || pcLoading"
        style="height: calc(100% - 35px)"
      >
        <q-list separator>
          <q-item
            clickable
            v-ripple
            v-for="(cmd, i) in providerCommands.items"
            :key="i"
            @click="openMoreDialog(cmd)"
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
        <template v-if="(total = providerCommands.meta.totalItems) !== undefined && !pcLoading">
          <q-separator />
          <q-item>
            <q-pagination
              :model-value="pcInput.page"
              :max="providerCommands.meta.totalPages"
              v-model="pcInput.page"
              @update:model-value="getCommands(provider.id)"
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
        <q-inner-loading :showing="pcLoading">
          <q-spinner-cube size="80px" color="warning" />
        </q-inner-loading>
      </q-card-section>
      <q-card-section
        v-else
        style="height: calc(100% - 35px)"
        vertical
        class="column justify-center items-center"
      >
        <span class="text-subtitle1">
          Aucune commande n'a été effectuée depuis sa création.
          <q-btn
            v-close-popup
            icon="delete_forever"
            flat
            color="red"
            label="Supprimer"
            @click="softRemoveProvider(provider.id)"
          />
        </span>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, UnwrapRef } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import {
  useProviderCommands,
  useSoftRemoveProvider,
} from '../../graphql/provider/provider.service';
import { Command, Provider } from '../../graphql/types';
import { formatDate } from '../../shared/date';

export default defineComponent({
  name: 'SoftRemoveProvider',
  props: {
    provider: {
      type: Object as PropType<Provider>,
      required: true
    },
  },
  emits: ['ok'],
  setup() {
    const { dialogRef } = useDialogPluginComponent();
    return {
      dialogRef,
      ...useProviderCommands(5),
      formatDate,
      ...useSoftRemoveProvider()
    }
  },
  beforeCreate() {
    this.getCommands(this.provider.id)
  },
  methods: {
    openMoreDialog(cmd: UnwrapRef<Command> ) {
      Object.assign(this.selectedCmd[0], {...cmd, provider: this.provider });
      this.$emit('ok', this.selectedCmd[0]);/**emit selected reference to parent**/
    }
  }
});
</script>

<style scoped>

</style>
