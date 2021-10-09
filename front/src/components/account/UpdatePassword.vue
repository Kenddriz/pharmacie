<template>
  <q-item-section top side>
    <q-btn size="sm" :loading="loading" icon="edit" round dense flat>
      <q-popup-proxy class="bg-teal-14" :offset="[50, 0]" transition-show="flip-up" transition-hide="flip-down">
        <q-form @submit="updatePassword" class="q-gutter-y-sm q-pa-md">
          <PasswordInput
            dark
            :model-value="input.currentPassword"
            v-model="input.currentPassword"
            label="Mot de passe actuel"
            dense
          />
          <PasswordInput
            dark
            :model-value="input.newPassword"
            v-model="input.newPassword"
            label="Nouveau mot de passe"
            dense
          />
          <div class="row justify-around">
            <q-btn v-close-popup type="submit" color="white" dense flat icon="save" round />
            <q-btn v-close-popup dense icon="close" round flat color="red" />
          </div>
        </q-form>
      </q-popup-proxy>
    </q-btn>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUpdatePassword } from '../../graphql/user/user.service';
import PasswordInput from './PasswordInput.vue';

export default defineComponent({
  name: 'UpdatePassword',
  components: { PasswordInput },
  setup() {
    return {
      ...useUpdatePassword(),
      types: [true, true]
    }
  }
});
</script>

<style scoped>

</style>
