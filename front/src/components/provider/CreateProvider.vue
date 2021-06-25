<template>
  <q-card square flat bordered>
    <q-card-section align="center">
      <div class="text-h5">Nouveau fournisseur</div>
    </q-card-section>

    <q-separator inset />

    <q-card-section class="q-gutter-sm">
      <div class="text-h6">Détails</div>
      <q-input
        v-model="input.name"
        outlined
        dense
        label="Nom"
      />
      <q-input
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
        v-for="(cType, index) in input.contactTypes"
        :key="index"
        dense
        class="full-width q-mb-sm"
      >
        <q-expansion-item
          expand-separator
          icon="perm_identity"
          :label="contactTypes[index]"
        >
          <div class="q-ma-sm">
              <ContactInput
                v-for="i in cType.contacts.length"
                :key="i"
                :label="`${contactTypes[index]} ${i}`"
                v-model:model-value="cType.contacts[i - 1]"
                class="q-mb-sm"
                @remove="removeContact(index, i - 1)"
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

    <q-separator inset />

    <q-card-actions align="right">
      <q-btn
        @click="submitCreateProvider"
        color="secondary"
        no-caps
        label="submit"
        :loading="loading"
      />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import ContactInput from './ContactForm.vue';
  import {useCreateProviderService} from '../../graphql/provider/create/create.provider.service';

  export default defineComponent({
    components: { ContactInput },
    setup () {
      return {
        expanded: ref(false),
        ...useCreateProviderService()
      }
    }
  })
</script>

<style scoped>

</style>
