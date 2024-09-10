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
  import { ref } from 'vue';
  import { useRouter } from "vue-router";
  
  const router = useRouter()
  const summaryData = ref([
    {
      title: 'No of Disbursement',
      amount: '0',
      color: 'tw-bg-primary',
      link: null
    },
    {
      title: 'Active Credit',
      amount: '320',
      color: 'tw-bg-blue',
      link: null
    },
    {
      title: 'Amount Disbursed',
      amount: '322',
      color: 'tw-bg-orange',
      link: null
    },
    {
      title: 'Amount Repaid',
      amount: '40',
      color: 'tw-bg-lime',
      link: '/customers/unverified'
    },
    {
      title: 'Pending Loan Repayment',
      amount: '40',
      color: 'tw-bg-wine',
      link: '/customers/unverified'
    }
  ]);

  const redirect = (item:any) => {
    item.link ? router.push(item.link) : ''
  }
  
  </script>
  
  <style lang="scss" scoped>
  </style>
  