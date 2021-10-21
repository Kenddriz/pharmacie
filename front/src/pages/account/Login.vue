<template>
  <q-layout view="hHh lpR fFf">
    <WindowTools>
      <div class="text-h6">Fary</div>
    </WindowTools>
    <q-page-container>
      <div class="login-container text-blue-grey-14">
        <q-avatar
          size="150px"
          style="transform: translateY(50px); z-index: 1"
          color="teal"
        >
          <img alt="" src="avatar.svg">
        </q-avatar>
        <q-card
          flat
          class="login q-pa-lg"
          style="transform: translateY(-30px);"
        >
          <q-card-section class="text-center text-h4 q-mt-md">
            AUTHENTIFICATION
          </q-card-section>
          <q-card-section class="q-pt-sm">
            <q-form @submit.prevent="submitLogin" class="q-gutter-lg">
              <q-input
                :model-value="input.username"
                dense
                outlined
                label="Nom d'utilisateur"
                v-model="input.username"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                :model-value="input.password"
                dense
                outlined
                label="Mot de passe"
                v-model="input.password"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:prepend>
                  <q-icon class="cursor-pointer" @click="isPwd =!isPwd" name="person" />
                </template>
              </q-input>

              <q-card-actions align="center">
                <q-btn
                  :loading="loading"
                  no-caps
                  rounded
                  icon-right="login"
                  color="primary"
                  type="submit"
                  label="Se connecter"
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useLogin} from '../../graphql/user/login/login.service';
  import WindowTools from '../../components/shared/WindowTools.vue';
  export default defineComponent({
    name: 'Login',
    components: { WindowTools },
    setup() {
      return {
        isPwd: ref<boolean>(true),
        ...useLogin()
      }
    }
  })
</script>

<style lang="scss">

 .login-container {
   height: 100vh;
   background-color: whitesmoke;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: flex-start;
 }
 .login {
   padding-top: 60px;
   border-radius: 20px;
   box-shadow: 13px 13px 20px #cbced1;
 }
 .q-field__control {
   color: $primary!important;
 }
</style>
