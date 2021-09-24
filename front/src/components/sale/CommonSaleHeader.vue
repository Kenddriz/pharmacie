<template>
  <tr>
    <th>N°Lot</th>
    <th>Médicament</th>
    <th>Prix unitaire</th>
    <th>TVA(%)</th>
    <th>Remise(%)</th>
    <th :colspan="maxUnitSize">Quantité</th>
    <th>Montant</th>
    <th width="50">
      <slot></slot>
    </th>
  </tr>
</template>

<script>
export default {
  name: 'CommonSaleHeader',
  props: {
    maxUnitSize: {
      type: Number,
      default: 1
    }
  }
};
</script>

<style scoped>

</style>
