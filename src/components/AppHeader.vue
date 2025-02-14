<template>
  <v-app-bar class="tw-font-medium">
    <template v-slot:default>
      <div class="header">
        <div class="header-title">
          <h1 class="tw-text-2xl tw-ml-5 tw-font-semibold">{{ route.meta.title }}</h1>
        </div>
        <div class="tw-flex tw-items-center tw-gap-3" v-if="canHandle">
          <p class="tw-underline">Disable All Client Login</p>
          <v-switch  hide-details v-model="disable"  color="success"></v-switch>
        </div>
        
      </div>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCustomersStore } from "@/stores";
import { onMounted, ref, watch } from 'vue';
import { SAVED_ADMIN_ROLE } from '@/constants';

import { openToastNotification } from "@/utils";

const customerStore = useCustomersStore();

const route = useRoute();
const disable = ref(false);
const manaulSwitch = ref(true)

const canHandle = computed(()=>{ 
  let roles = [
      "superadmin",
      "internal_control_manager"
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE) as string;
  return roles.includes(adminRole)
})

const updateState = async () => {
  const status = disable.value ? "deactivate": "activate"
  let res = await customerStore.disableAllCustomers(status)

  if(res){
    openToastNotification({
      message: `All customers has ${disable.value ? "deactivated": "activated"} successfully`,
      variant: "success",
    });

    localStorage.setItem('deacivateCustomers', JSON.stringify(disable.value))
  }else{
    manaulSwitch.value = false;
    disable.value = !disable.value;
    
    setTimeout(() => {
      manaulSwitch.value = true
    }, 1000);
  }
};

watch(()=>disable.value, () => {
  if(manaulSwitch.value){
    updateState();
  }
 
});

onMounted(() => {
  const toggleSaate = localStorage.getItem('deacivateCustomers');
  if(toggleSaate)  disable.value =JSON.parse(toggleSaate)
})
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