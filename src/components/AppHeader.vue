<template>
  <v-app-bar class="tw-font-medium">
    <template v-slot:default>
      <div class="header">
        <div class="header-title">
          <h1 class="tw-text-2xl tw-ml-5 tw-font-semibold">{{ route.meta.title }}</h1>
        </div>
        <div class="tw-flex tw-items-center tw-gap-3">
          <p class="tw-underline">Disable All Client Login</p>
          <v-switch  hide-details v-model="disable"  color="success"></v-switch>
        </div>
        
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useCustomersStore } from "@/stores";
import { ref, watch } from 'vue';

import { openToastNotification } from "@/utils";

const customerStore = useCustomersStore();

const route = useRoute();
const disable = ref(false);

const updateState = async () => {
  const status = disable.value ? "deactivate": "activate"
  await customerStore.disableAllCustomers(status)

  openToastNotification({
    message: `All customers has ${disable.value ? "deactivated": "activated"} successfully`,
    variant: "success",
  });
};

watch(()=>disable.value, () => {
  updateState();
});

</script>

<style scoped>
.header {
  min-width: 100%;
  min-height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px 0 0;
  justify-content: space-between;
}

.header-title {
  display: flex;
  align-items: center;
}
</style>