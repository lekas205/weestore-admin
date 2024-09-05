<template>
  <div class="product-summary" :class="`card-${type}`">
    <p class="mb-2">
      {{ title }}
    </p>
    <p class="tw-text-xl tw-font-medium">
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">

interface Props {
  title: string;
  value: string | number;
  type: 'blue' | 'brown' | 'red'
}

withDefaults(defineProps<Props>(), {});
</script>

<style scoped>

</style>