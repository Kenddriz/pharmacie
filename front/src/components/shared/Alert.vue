<template>
  <q-card class="alert q-ma-sm">
    <q-card-section>
      <div class="text-positive text-bold">{{ label }}</div>
      <div class="row no-wrap items-center justify-between text-positive">
        <q-icon size="25px" name="visibility" />
        <div>
          {{ value }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
  export default {
    name: 'Alert',
    props: {
      label: String,
      value: Number
    }
  };
</script>

<style lang="scss" scoped>
  .alert {
    width: 300px;
  }
</style>
