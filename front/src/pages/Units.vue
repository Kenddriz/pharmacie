<template>
  <q-page class="row">
    <div class="col-12 col-md-6 q-pa-sm">
      <ConditioningComponent></ConditioningComponent>
    </div>
    <div class="col-12 col-md-6 q-pa-sm">
      <DosageComponent />
    </div>
  </q-page>
</template>

<script lang="ts">

import ConditioningComponent from '../components/packaging/PackagingComponent.vue';
import DosageComponent from '../components/dosage/DosageComponent.vue';

export default {
  name: 'Units',
  components: { ConditioningComponent, DosageComponent }
}
</script>

<style scoped>

</style>
