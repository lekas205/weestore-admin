<template>
  <v-row>
    <v-col
      v-for="(item, idx) in summaryData"
      :key="idx"
      cols="12"
      md="4"
    >
      <div class="summary-card" :class="item.class">
        <img class="mb-2" :src="item.icon" alt="" />
        <p class="mb-2">
          {{ item.title }}
        </p>
        <p class="tw-text-xl tw-font-medium">
          {{ item.amount }}
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import summaryCardIcon1 from '@/assets/images/svg/summary-card-1-icon.svg'
import summaryCardIcon2 from '@/assets/images/svg/summary-card-2-icon.svg'
import summaryCardIcon3 from '@/assets/images/svg/summary-card-3-icon.svg'

import { computed, ref } from 'vue';
import { formatAsMoney } from "@/utils";

const props = defineProps<{
  stats: any
}>();

const summaryData = computed<any[]>(()=>{
  return [
  {
    title: 'Total Completed Sales',
    amount:  formatAsMoney(props.stats.totalCompletedSales),
    icon: summaryCardIcon1,
    class: 'summary-card-1'
  },
  {
    title: 'Items In Stock',
    amount: formatAsMoney(props.stats.itemsInStock, false),
    icon: summaryCardIcon2,
    class: 'summary-card-2'
  },
  {
    title: 'Item Out Of Stock',
    amount: formatAsMoney(props.stats.itemsOutOfStock, false),
    icon: summaryCardIcon3,
    class: 'summary-card-3'
  }
]
})

</script>

<style scoped>
.summary-card {
  border-radius: 12px;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.summary-card-1 {
  background: linear-gradient(0deg, #06177A, #06177A);
  box-shadow: 0px 4px 4px 0px #071C9640;
}

.summary-card-2 {
  background: linear-gradient(0deg, #F65901, #F65901);
  box-shadow: 0px 4px 4px 0px #F6590140;
}

.summary-card-3 {
  background: linear-gradient(0deg, #AB0F0F, #AB0F0F);
  box-shadow: 0px 4px 4px 0px #AB0F0F40;
}
</style>
