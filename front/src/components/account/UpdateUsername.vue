<template>
  <q-item-section top side>
    <q-btn size="sm" icon="edit" :loading="loading" round dense flat>
      <q-popup-edit
        v-model="input.username"
        :model-value="username"
        v-slot="scope"
        class="q-mr-sm bg-teal-14"
      >
        <q-input
          dark
          :model-value="scope.value"
          v-model="input.username"
          dense autofocus
          @keyup.enter="updateUser();scope.set();"
          spellcheck="false"
        >
          <template v-slot:append>
            <q-icon
              v-close-popup
              class="cursor-pointer"
              color="white"
              name="save"
              @click="updateUser()"
            />
          </template>
        </q-input>
      </q-popup-edit>
    </q-btn>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUpdateUser } from '../../graphql/user/user.service';

export default defineComponent({
  name: 'UpdateUsername',
  props: {
    username: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const { loading, input, updateUser } = useUpdateUser();
    input.username = String(props.username);
    return {
      loading,
      input,
      updateUser
    }
  }
});
</script>

<style scoped>

</style>
