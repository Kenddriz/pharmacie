<template>
  <div id="login-container" class="text-blue-grey-14">
    <q-avatar
      size="150px"
      style="transform: translateY(50px); z-index: 1"
      color="teal"
    >
      <img src="avatar.svg">
    </q-avatar>
    <q-card
      flat
      class="login q-pa-lg"
      style="transform: translateY(-30px);"
    >
      <q-card-section align="center">
        <h1 class="text-h4 q-mb-sm">AUTHENTIFICATION</h1>
        <div class="text-h6">Fary</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="submitLogin" class="q-gutter-lg">
          <q-input
            outlined
            label="Nom d'utilisateur"
            v-model="input.username"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
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
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import {useLogin} from '../../graphql/user/login/login.service';
  export default defineComponent({
    name: 'Login',
    setup() {
      return {
        isPwd: ref<boolean>(true),
        ...useLogin()
      }
    }
  })
</script>

<style lang="scss">

 #login-container {
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
