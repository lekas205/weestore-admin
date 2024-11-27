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
  import { computed, ref } from 'vue';
  import { useRouter } from "vue-router";
  
  const router = useRouter();

  const props = defineProps<{
    stats: any
  }>()

  const summaryData = computed(()=>{
    return  [
    {
      title: 'No of Disbursement',
      amount: props.stats.totalNoOfDisbursement,
      color: 'tw-bg-primary',
      link: null
    },
    {
      title: 'Active Credit',
      amount: props.stats.activeCredit,
      color: 'tw-bg-blue',
      link: null
    },
    {
      title: 'Amount Disbursed',
      amount: props.stats.amountDisbursed,
      color: 'tw-bg-orange',
      link: null
    },
    {
      title: 'Amount Repaid',
      amount: props.stats.amountRepaid,
      color: 'tw-bg-lime',
      link: null
    },
    {
      title: 'Pending Loan Repayment',
      amount: props.stats.pendingLoanRepayment,
      color: 'tw-bg-wine',
      link: "/credits/pending-repayment"
    }
  ]
  });

  const redirect = (item:any) => {
    item.link ? router.push(item.link) : ''
  }
  
  </script>
  
  <style lang="scss" scoped>
  </style>
  