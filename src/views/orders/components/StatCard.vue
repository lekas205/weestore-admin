<template>
  <section class="tw-flex tw-gap-2 summary-section">
    <div 
      @click="redirect((item))"
      v-for="(item, idx) in summaryData"
      :class="`${item.color} tw-text-white tw-text-center tw-rounded-md tw-px-[40px] tw-py-[30px] tw-w-[30%]`" 
    >
      <p class="tw-text-[20px] tw-mb-5">
        {{ item.title }}
      </p>
      <p class="tw-font-bold tw-text-[31px]">
        {{ item.amount }}
      </p>
    </div>
  </section>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from "vue-router";
  
  const router = useRouter()

const summaryData = ref([
  {
    title: 'Number of New Order',
    amount: '0',
    color: 'tw-bg-primary',
    link: null
  },
  {
    title: 'Orders in Processing',
    amount: '320',
    color: 'tw-bg-blue',
    link: null
  },
  {
    title: 'Orders in Transit',
    amount: '322',
    color: 'tw-bg-lime',
    link: null
  },
  {
    title: 'Orders Completed',
    amount: '40',
    color: 'tw-bg-wine',
    link: null
  },
  {
    title: 'Orders Returned',
    amount: '10',
    color: 'tw-bg-orange',
    link: "/orders/returned-order"
  },
]);

const redirect = (item:any) => {
    item.link ? router.push(item.link) : ''
  }

</script>

<style lang="scss" scoped>
</style>
