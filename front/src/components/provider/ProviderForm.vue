<template>
  <q-card bordered>
    <q-card-section class="q-pa-md" horizontal align="center">
      <div class="text-h6 text-weight-bold">{{$tm('provider.' + mode)}}</div>
      <q-space />
      <q-btn color="red" v-if="mode === 'update'" dense flat icon="close" v-close-popup>
        <q-tooltip>Fermer</q-tooltip>
      </q-btn>
    </q-card-section>
    <q-separator inset />
    <ScrollArea :style="`height:${$q.screen.height - 200}px`">
      <q-card-section class="q-gutter-sm">
        <div class="text-h6">Détails</div>
        <q-input
          :model-value="input.name"
          v-model="input.name"
          outlined
          dense
          label="Nom"
        />
        <q-input
          :model-value="input.address"
          v-model="input.address"
          outlined
          dense
          label="Adresse"
        />
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <div class="text-h6 q-mb-sm">Contacts</div>
        <q-list
          bordered
          v-for="(contact, index) in $tm('contacts')"
          :key="index"
          dense
          class="full-width q-mb-sm"
        >
          <q-expansion-item
            expand-separator
            icon="perm_identity"
            :label="contact"
          >
            <div class="q-ma-sm">
              <ContactInput
                v-for="i in input.contacts[index].list.length"
                :key="i"
                :label="`${contact} ${i}`"
                v-model:model-value="input.contacts[index].list[i - 1]"
                class="q-mb-sm"
                @remove="removeContact(index, i-1)"
              />
              <q-btn
                round
                color="teal-4"
                class="q-mb-sm"
                size="sm"
                icon="add"
                @click="addContact(index)"
              />
            </div>
          </q-expansion-item>
        </q-list>
      </q-card-section>
    </ScrollArea>
    <q-separator inset />
    <q-card-actions align="right">
      <q-btn
        v-close-popup
        @click="filterInput"
        color="secondary"
        no-caps
        label="Enregistrer"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
  import { ref, defineComponent, PropType, reactive } from 'vue';
  import ContactInput from '../contact/ContactInput.vue';
  import { SaveProviderInput } from '../../graphql/types';
  import { useI18n } from 'vue-i18n';
  import { defaultProviderInput } from '../../graphql/provider/provider.service';
  import ScrollArea from '../shared/ScrollArea.vue';

  export default defineComponent({
    name: 'ProviderForm',
    components: { ContactInput, ScrollArea },
    emits: ['submit'],
    props: {
      modelValue: Object as PropType<SaveProviderInput>,
      mode: {
        type: String,
        default: 'add'
      }
    },
    setup (props, { emit }) {
      const { tm } =  useI18n();
      const input = reactive<SaveProviderInput>({
        ...defaultProviderInput,
        contacts: (tm('contacts') as string[]).map((type, index) => ({ type: index, list: [] })),
      });
      if(props.modelValue)Object.assign(input, props.modelValue);
      function filterInput() {
        input.contacts = input.contacts.map(c => ({
          type: c.type,
          list: c.list.filter(l => l.trim() !== '')
        }));
        emit('submit', input);
      }
      return {
        expanded: ref(false),
        input,
        addContact: (index: number) => {
          input.contacts[index].list.push('');
        },
        removeContact: (cIndex: number, lIndex: number) => {
          input.contacts[cIndex].list.splice(lIndex, 1);
        },
        filterInput
      }
    }
  })
</script>

<style scoped>

</style>
