<template>
  <div>
    <AppSidebar></AppSidebar>
    <AppHeader></AppHeader>
    <v-main>
      <slot />
    </v-main>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from '../components/AppSidebar.vue'
import AppHeader from '../components/AppHeader.vue'

</script>

<style scoped></style>
