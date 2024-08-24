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
    <summary-cards />
    <stat-cards />
  </div>
</template>

<script setup lang="ts">
import SummaryCards from './components/SummaryCard.vue'
import StatCards from './components/StatCard.vue'

import { ref } from 'vue'

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
