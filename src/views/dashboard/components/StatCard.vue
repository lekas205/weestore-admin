<template>
  <v-row>
    <v-col v-for="(item, idx) in statCardData" :key="idx" cols="12" md="3">
      <div class="stat-card">
        <div class="stat-icon" :class="item.iconClass">
          <img :src="item.icon" alt="" />
        </div>
        <div class="stat-text">
          <p>{{ item.title }}</p>
          <p class="tw-font-bold tw-text-xl">{{ item.value }}</p>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import statCardIcon1 from '@/assets/images/svg/stat-card-1-icon.svg'
import statCardIcon2 from '@/assets/images/svg/stat-card-2-icon.svg'
import statCardIcon3 from '@/assets/images/svg/stat-card-3-icon.svg'
import statCardIcon4 from '@/assets/images/svg/stat-card-4-icon.svg'

import { computed, ref } from 'vue';
import { formatAsMoney } from "@/utils";

const props = defineProps<{
  stats: any
}>();

const statCardData = computed<any[]>(()=>{
  return [
    {
      title: 'No of Warehouse',
      value: formatAsMoney(props.stats.noOfWarehouse, false),
      icon: statCardIcon1,
      iconClass: 'stat-icon-1',
    },
    {
      title: 'Active Resellers',
      value: formatAsMoney(props.stats.noOfactiveResellers, false),
      icon: statCardIcon2,
      iconClass: 'stat-icon-2',
    },
    {
      title: 'Completed Order',
      value: formatAsMoney(props.stats.noOfCompletedOrders, false),
      icon: statCardIcon3,
      iconClass: 'stat-icon-3',
    },
    {
      title: 'Returned Order',
      value: formatAsMoney(props.stats.noOfReturnOrders, false),
      icon: statCardIcon4,
      iconClass: 'stat-icon-4',
    }
  ]
})
</script>

<style lang="scss" scoped>
.stat-card {
  padding: 1rem;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 4px 4px 0px #0000002B;
  border: 1px solid #00000059;
  display: flex;
  gap: 0.7rem;
}

.stat-icon {
  border-radius: 50%;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon-1 {
  background: #071C9654;
}

.stat-icon-2 {
  background: #CFBB0354;
}

.stat-icon-3 {
  background: #F6590154;
}

.stat-icon-4 {
  background: #AB0F0F54;
}

.stat-text {
  flex-grow: 1;
}
</style>
