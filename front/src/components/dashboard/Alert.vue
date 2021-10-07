<template>
  <q-card class="text-blue-grey-14" bordered flat>
    <q-card-section>
      <div class="text-bold">{{ label }}</div>
      <q-separator class="q-my-sm" />
      <div class="row no-wrap items-center justify-between">
        <q-icon size="25px" :name="icon" />
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
      icon: String,
      value: Number
    }
  };
</script>

<style lang="scss" scoped>
</style>
