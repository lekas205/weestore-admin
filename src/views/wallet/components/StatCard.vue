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

        <p v-if="item.sub_text" class=""> {{ item.sub_text }} </p>
      </div>
    </section>
  
  </template>
  
  <script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from "vue-router";
  import { formatAsMoney } from "@/utils";
  import { SAVED_ADMIN_ROLE } from '@/constants';

    
  const router = useRouter();

  const props = defineProps<{
    stats: any
  }>()
  
  const summaryData = computed(()=>{
    return  [
      {
        title: ' Total Amount in Pocket',
        amount:  formatAsMoney(props.stats.totalAmountInWallet) ,
        color: 'tw-bg-primary',
        link: null
      },
      {
        title: ' Total Amount in Rewards',
        amount:  formatAsMoney(props.stats.totalAmountInReward) ,
        color: 'tw-bg-orange',
        link: null
      },
      {
        title: 'Pending Topup Approval',
        amount:  props.stats.pendingTopUpApproval,
        color: 'tw-bg-blue',
        link: "/wallets/topup-approval",
        sub_text: "Click Here to View Request"
      },

    ]
  });
  const canHandle = computed(()=>{  
  let roles = [
      "superadmin",
      "accountant"
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE) as string;

  return roles.includes(adminRole )
})  

  const redirect = (item:any) => {
      item.link && canHandle.value ? router.push(item.link) : ''
    }
  
  </script>
  
  <style lang="scss" scoped>
  </style>
  