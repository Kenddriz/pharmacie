<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard resizable class="resizable">
      <template v-slot:title>
        {{name}}
      </template>
      <q-item v-if="((total = commands.meta.totalItems) && !pcLoading)">
        <q-item-section>
          <q-item-label>Vous ne pouvez pas supprimer ce fournisseur</q-item-label>
          <q-item-label caption>
            Vous lui avez effectué {{total}} commande{{total > 1 ? 's' : ''}} depuis sa création.
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <CommandList
        :commands="commands.items"
        :selected-id="selectedCmd[0]?.id"
        @select="shoMore($event)"
      />
      <NoData :sizes="[95, 100]" :loading="pcLoading" :total-items="commands.meta.totalItems">
        <div class="text-body2">
          Aucune commande n'a été effectuée depuis sa création.
          <q-btn
            v-close-popup
            icon="delete_forever"
            flat
            color="red"
            label="Supprimer"
            @click="softRemoveProvider(id)"
          />
        </div>
      </NoData>
      <template v-slot:footer>
        <q-banner class="full-width bg-grey-3">
          <template v-slot:action>
            <q-pagination
              :disable="commands.meta.totalItems <= 1"
              :model-value="input.page"
              :max="commands.meta.totalPages"
              v-model="input.page"
              input
            />
          </template>
        </q-banner>
      </template>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDialogPluginComponent } from 'quasar';
import { useSoftRemoveProvider } from '../../graphql/provider/provider.service';
import { formatDate } from '../../shared/date';
import { usePaginateCommands } from '../../graphql/command/command.service';
import NoData from '../shared/NoData.vue';
import CommandList from '../command/CommandList.vue';
import MovableCard from '../shared/MovableCard.vue';

export default defineComponent({
  name: 'SoftRemoveProvider',
  components: { NoData, CommandList, MovableCard },
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
    shoMore(index: number) {
      this.setSelectedCmd(index);
      this.$emit('ok', this.selectedCmd[0]);/**emit selected reference to parent**/
    }
  }
});
</script>

<style lang="scss" scoped>
  .resizable {
    width: 350px;
  }
</style>
