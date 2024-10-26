<template>
  <div class="dashboard-container">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          size="large"
          color="black"
          v-bind="props"
          variant="outlined"
        >
        <Filter />
          Filter by
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
          @click="filterTable(item.value)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <div class="dashboard-banner tw-text-lg mb-3 mt-3">
      At MoreBuy, we Pride ourselves to excellent customer satisfaction.
    </div>
    <summary-cards :stats="dashboardStats" />
    <stat-cards :stats="dashboardStats" />
    <div class="tw-flex tw-gap-4 tw-mb-[40px]">
      <performance-card :performanceStats="performanceData.slice(0, 2)" class="tw-w-[50%]"/>
      <performance-card :performanceStats="performanceData.slice(2, 4)" class="tw-w-[50%]"/>
    </div>
    <transaction-tables />
    <AppCustomDateRange v-model:openModal="openModal" @proceed="filterByCustom($event)" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {storeToRefs } from "pinia";
import SummaryCards from './components/SummaryCard.vue'
import StatCards from './components/StatCard.vue'
import AppCustomDateRange from "@/components/AppCustomDateRange.vue";
import PerformanceCard from "./components/PerformanceCard.vue";
import TransactionTables from "./components/TransactionTables.vue";
import { getDateRange } from "@/utils";

import { Filter} from 'lucide-vue-next'

import { useAuthStore, useDashboardStore } from "@/stores";

const authStore = useAuthStore();
const dashboadStore = useDashboardStore();

const { dashboardStats } = storeToRefs(dashboadStore);

const proValue = ref(21);
const payload = ref({
    page: 1,
    search: ""
});

const openModal = ref(false)
const  items =  ref([
  { title: 'Today', value: "today" },
  { title: 'Past 3 days', value: "last3" },
  { title: 'Past 7 days', value: "last7" },
  { title: 'Past 2 weeks', value: "last14" },
  { title: 'Last 30 days', value: "last30" },
  { title: 'Custom' , value: 'custom'},
])


const performanceData = computed<any[]>(()=>{
  return [
    {label: 'Top Performing Product', data: dashboardStats.value.topPerformingProduct },
    {label: 'Worst Performing Product', data: dashboardStats.value.worstPerformingProduct},
    {label: 'Top Performing Categories', data: dashboardStats.value.topPerformingCategory},
    {label: 'Top Performing Warehouse', data: dashboardStats.value.topPerformingWarehouse},
  ]
})

const filterTable = (range:string) => {
  if(range === 'custom') return openModal.value = true;
  getDashboardSats({ start_date: getDateRange(range), end_date: getDateRange('today')});
}

const filterByCustom = (payload:any) => {
  getDashboardSats(payload);
  openModal.value = false;
}

const getDashboardSats= async (query?: any) => {
  authStore.toggleLoader();
  await dashboadStore.getDashboardStats(query);
  authStore.toggleLoader();
}

onMounted(async () => {
  if(dashboardStats.value.noOfWarehouse) return
  getDashboardSats()
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
