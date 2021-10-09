<template>
  <q-footer class="bg-grey-3 text-blue-grey-14">
    <MainMenu bordered dense class="row justify-center text-body1"/>
  </q-footer>
</template>

<script lang="ts">
import  {defineComponent, ref} from 'vue';
import MainMenu from './MainMenu.vue';

  export default defineComponent({
    name: 'Footer',
    components: { MainMenu },
    setup() {
      return {
        tab: ref<string>('tab1')
      }
    }
  });
</script>

<style scoped>
</style>
