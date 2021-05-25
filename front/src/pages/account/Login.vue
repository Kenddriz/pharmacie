<template>
  <div id="login-container">
    <q-avatar
      size="150px"
      style="transform: translateY(50px); z-index: 1"
      color="teal"
    >
      <img src="register.jpg">
    </q-avatar>
    <q-card
      class="login q-pa-lg bg-teal"
      style="transform: translateY(-30px);"
    >
      <q-card-section class="text-white" align="center">
        <h1 class="text-h4 q-mb-sm">AUTHENTIFICATION</h1>
        <div class="text-h6">Pharmanager</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="submitLogin" class="q-gutter-lg">
          <q-input
            dark
            outlined
            label="Nom d'utilisateur"
            v-model="input.username"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            dark
            outlined
            label="Mot de passe"
            v-model="input.password"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-card-actions align="center">
            <q-btn
              no-caps
              rounded
              icon-right="login"
              color="positive"
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
  import { defineComponent } from 'vue';
  import {useLogin} from '../../graphql/user/login/login.service';
  export default defineComponent({
    name: 'Login',
    setup() {
      return {
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
   background-image: url("../../../public/register.svg");
   background-size: contain;
   background-repeat: no-repeat;
 }
 .login {
   min-height: 500px;
   padding-top: 60px;
   border-radius: 20px;
   box-shadow: 13px 13px 20px #cbced1;
 }
 .q-field__control {
   color: white;
 }
</style>
