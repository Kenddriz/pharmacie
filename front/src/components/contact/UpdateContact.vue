<template>
  <ContactForm
    v-model="input.label"
    color="blue-5"
    @submit="submitUpdateContact"
    :loading="loading"
  />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import ContactForm from './ContactForm.vue';
  import { Contact } from '../../graphql/types';
  import { useUpdateContact } from '../../graphql/contact/update/update.contact.service';

  export default defineComponent({
    name: 'UpdateContact',
    components: { ContactForm },
    props: {
      contact: {
        type: Object as PropType<Contact>,
        required: true
      }
    },
    setup(props) {
      return {
        ...useUpdateContact(props.contact)
      }
    }
  });
</script>

<style scoped>

</style>
