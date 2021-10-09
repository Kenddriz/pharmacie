<template>
  <q-input
    :type="type ? 'password' : 'text'"
    lazy-rules
    :rules="[v => v && v.length >= 4 && v.length <= 15 || 'Nombre de caractères entre 4 à 15']"
    hide-bottom-space
    label-color="white"
  >
    <template v-slot:append>
      <q-icon
        class="cursor-pointer"
        :name="type ? 'visibility' : 'visibility_off'"
        @click="type = !type"
      />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'PasswordInput',
  data() {
    return {
      type: true
    }
  }
};
</script>

<style scoped>

</style>
