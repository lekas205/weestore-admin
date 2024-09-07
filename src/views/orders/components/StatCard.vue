<template>
  <section class="tw-flex tw-gap-2 summary-section">
    <div 
      v-for="(item, idx) in summaryData"
      :class="`${item.color} tw-text-white tw-text-center tw-rounded-md tw-px-[40px] tw-py-[30px] tw-w-[30%]`" 
    >
      <p class="tw-text-[20px] tw-mb-5">
        {{ item.title }}
      </p>
      <p class="tw-text-xl tw-font-bold tw-text-[31px]">
        {{ item.amount }}
      </p>
    </div>
  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const summaryData = ref([
  {
    title: 'Number of New Order',
    amount: '0',
    color: 'tw-bg-primary'
  },
  {
    title: 'Orders in Processing',
    amount: '320',
    color: 'tw-bg-blue'
  },
  {
    title: 'Orders in Transit',
    amount: '322',
    color: 'tw-bg-lime'
  },
  {
    title: 'Orders Completed',
    amount: '40',
    color: 'tw-bg-wine'
  },
  {
    title: 'Orders Returned',
    amount: '10',
    color: 'tw-bg-orange'
  },
]);

</script>

<style lang="scss" scoped>
</style>
