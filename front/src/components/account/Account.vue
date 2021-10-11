<template>
  <div class="row justify-around q-pa-sm q-gutter-y-md">
    <UpdateUserAvatar :avatar="Iam?.avatar" />
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Nom d'utilisateur</q-item-label>
          <q-item-label caption>{{Iam?.username}}</q-item-label>
        </q-item-section>
        <UpdateUsername :username="Iam?.username" />
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Mot de passe</q-item-label>
          <q-item-label caption>**************</q-item-label>
        </q-item-section>
        <UpdatePassword />
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Date de création</q-item-label>
          <q-item-label v-if="Iam" caption>
            {{formatDate(Iam.createdAt, 'DATE_TIME')}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator class="q-my-md" />
    <MainMenu
      class="col-12"
      active-class="text-primary"
    >
      <q-item
        v-close-popup
        class="col text-center"
        clickable
        @click="logout"
      >
        <q-item-section avatar>
          <q-icon name="logout" />
        </q-item-section>
        <q-item-section>Se déconnecter</q-item-section>
      </q-item>
    </MainMenu>
    <q-inner-loading :showing="loading">
      <q-spinner-oval size="60px" color="warning" />
    </q-inner-loading>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useWHoAmI } from '../../graphql/user/whoAmI/whoAmi.service';
import { formatDate } from '../../shared/date';
import UpdateUsername from './UpdateUsername.vue';
import UpdatePassword from './UpdatePassword.vue';
import UpdateUserAvatar from './UpdateUserAvatar.vue';
import MainMenu from '../../layouts/MainMenu.vue';
import { useQuasar } from 'quasar';
import { useSession } from '../../graphql/user/login/session';

export default defineComponent({
  name: 'Account',
  components: { MainMenu, UpdateUsername, UpdatePassword, UpdateUserAvatar },
  setup() {
    const { notify } = useQuasar();
    const { logout } = useSession();
    return {
      ...useWHoAmI(),
      formatDate,
      logout () {
        const notification = notify({
          color: 'teal-14',
          group: false,
          timeout: 0,
          spinner: true,
          message: 'Fermeture de session dans',
          caption: '4s',
          position: 'center'
        });
        let percentage = 0
        const interval = setInterval(() => {
          percentage += 1;
          notification({
            caption: `${percentage}s`,
            actions: [
              {
                label: 'Annuler',
                color: 'white',
                noCaps: true,
                handler: () => clearInterval(interval)
              }
            ]
          })
          if (percentage === 4) {
            notification({
              icon: 'done', // we add an icon
              spinner: false, // we reset the spinner setting so the icon can be displayed
              message: 'Déconnecté(e)',
              timeout: 10,
              caption: '',
              onDismiss: () => logout()
            })
            clearInterval(interval);
          }
        }, 1000)
      }
    }
  }
});
</script>

<style scoped>

</style>
