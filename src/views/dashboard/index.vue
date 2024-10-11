<template>
  <div class="dashboard-container">
    <div class="tw-flex mb-2 pl-2">
      <div class="filter-container">
        <img class="mr-2" src="@/assets/images/svg/filter-icon.svg" alt="">
        <p>Filter by</p>
      </div>
    </div>
    <div class="dashboard-banner tw-text-lg mb-3">
      At MoreBuy, we Pride ourselves to excellent customer satisfaction.
    </div>
    <summary-cards :stats="dashboardStats" />
    <stat-cards :stats="dashboardStats" />
    <div class="tw-flex tw-gap-4 tw-mb-[40px]">
      <performance-card :performanceStats="performanceData" class="tw-w-[50%]"/>
      <performance-card :performanceStats="performanceData" class="tw-w-[50%]"/>
    </div>
    <transaction-tables />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {storeToRefs } from "pinia";
import SummaryCards from './components/SummaryCard.vue'
import StatCards from './components/StatCard.vue'
import PerformanceCard from "./components/PerformanceCard.vue";
import TransactionTables from "./components/TransactionTables.vue";

import { useAuthStore, useDashboardStore } from "@/stores";

const authStore = useAuthStore();
const dashboadStore = useDashboardStore();

const { dashboardStats } = storeToRefs(dashboadStore);

const proValue = ref(21);
const payload = ref({
    page: 1,
    search: ""
});

const performanceData = ref<any[]>([
  {label: 'Top Performing Product', data: [{name: 'Molfix Diaper', percentage: 30},  {name: 'Nutrilac', percentage: 30},  {name: 'Nutrilac', percentage: 30}]},
  {label: 'Worst Performing Product', data: [{name: 'Molfix Diaper', percentage: 30},  {name: 'Nutrilac', percentage: 30},  {name: 'Nutrilac', percentage: 30}]},
]);

onMounted(async () => {
  if(dashboardStats.value.noOfWarehouse) return
  authStore.toggleLoader();
  await  dashboadStore.getDashboardStats();
  authStore.toggleLoader();
})

</script>

<style lang="scss" scoped>
.dashboard-container {
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 1rem;
}

.filter-container {
  display: flex;
  border: 1px solid black;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
}

.dashboard-banner {
  background: #FFF5EF;
  padding: 1rem;
  color: #F95959;
  border-radius: 12px;
}
</style>
