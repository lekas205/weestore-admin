<template>
  <v-app-bar class="tw-font-medium">
    <template v-slot:default>
      <div class="header">
        <div class="header-title">
          <h1 class="tw-text-2xl tw-ml-5 tw-font-semibold">{{ route.meta.title }}</h1>
        </div>
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute();

</script>

<style scoped>
.header {
  min-width: 100%;
  min-height: 100%;
  display: flex;
}

.header-title {
  display: flex;
  align-items: center;
}
</style>