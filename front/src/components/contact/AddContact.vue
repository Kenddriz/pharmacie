<template>
  <ContactForm
    v-for="i in input.contacts.length"
    :key="i"
    v-model="input.contacts[i - 1]"
    color="teal-14"
    @reset="removeContact"
    @submit="submitAddContact"
  />
  <q-btn
    round
    color="teal-14"
    class="q-mb-sm"
    size="sm"
    icon="add"
    @click="addContact"
    :loading="loading"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ContactForm from './ContactForm.vue';
  import { useAddContact } from '../../graphql/contact/add/add.contact.service';

  export default defineComponent({
    name: 'AddContact',
    components: { ContactForm },
    props: {
        pId: {
          type: Number,
          required: true
        },
        cTypeId: {
          type: Number,
          required: true
        }
    },
    setup(props) {
      return {
        ...useAddContact(props.pId, props.cTypeId)
      }
    }
  });
</script>

<style scoped>

</style>
