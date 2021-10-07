<template>
  <div class="row justify-center q-pa-sm q-gutter-y-md">
    <q-avatar color="grey" size="200px">
      <q-img src="register.svg">
        <div class="absolute-bottom-right transparent">
          <q-btn
            outline
            color="warning"
            round
            size="sm"
            icon="camera"
            style="margin-right: 5px"
          />
        </div>
      </q-img>
    </q-avatar>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Nom d'utilisateur</q-item-label>
          <q-item-label caption>RAKOTOTO</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-btn icon="edit" round dense flat />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Mot de passe</q-item-label>
          <q-item-label caption>RAKOTOTO</q-item-label>
        </q-item-section>
        <q-item-section top side>
          <q-btn icon="edit" round dense flat />
        </q-item-section>
      </q-item>
      <q-separator class="q-my-md" />
      <q-item
        to="/dashboard"
        active-class="text-white bg-teal-8"
        exact
      >
        <q-item-section avatar>
          <q-icon name="dashboard" />
        </q-item-section>
        <q-item-section>Tableau de board</q-item-section>
      </q-item>
      <q-item
        to="/main"
        active-class="text-white bg-teal-8"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>
        <q-item-section>Espace de travail</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Account',
});
</script>

<style scoped>

</style>
