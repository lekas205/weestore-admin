<template>
    <section class="tw-flex tw-gap-2">
      <div 
        v-for="(item, idx) in summaryData"
        @click="redirect((item))"
        :class="`${item.color} tw-text-white tw-text-center tw-rounded-md tw-px-[40px] tw-py-[30px] tw-w-[19%] tw-max:w-[200px]`" 
      >
        <p class="tw-text-[20px] tw-mb-5">
          {{ item.title }}
        </p>
        <p class="tw-font-bold tw-text-[30px]">
          {{ item.amount }}
        </p>
      </div>
    </section>
  
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from "vue-router";
  
  const router = useRouter()

  const props = defineProps<{
    stats: any
  }>()
  const summaryData = computed(()=> {
    return [
      {
        title: ' All Customers',
        amount: props.stats.totalCustomer,
        color: 'tw-bg-primary',
        link: null
      },
      {
        title: 'Active Customers',
        amount: props.stats.activeCustomer,
        color: 'tw-bg-blue',
        link: null
      },
      {
        title: 'In Active Customers',
        amount: props.stats.inactiveCustomer,
        color: 'tw-bg-lime',
        link: null
      },
      {
        title: 'Unverified Customers',
        amount: props.stats.unverifiedCustomer,
        color: 'tw-bg-wine',
        link: '/customers/unverified'
      }
    ]
  });

  const redirect = (item:any) => {
    item.link ? router.push(item.link) : ''
  }
  
  </script>
  
  <style lang="scss" scoped>
  </style>
  