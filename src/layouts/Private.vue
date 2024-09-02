<template>
  <div>
    <AppSidebar></AppSidebar>
    <AppHeader></AppHeader>
    <v-main>
      <slot />
      <!-- <AppPageLoader v-if="authStore.loader" /> -->
    </v-main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '../components/AppSidebar.vue'
import AppHeader from '../components/AppHeader.vue'
import AppPageLoader from '../components/AppPageLoader.vue'
import { useAuthStore } from '@/stores'

const authStore = useAuthStore();
</script>

<style scoped></style>
