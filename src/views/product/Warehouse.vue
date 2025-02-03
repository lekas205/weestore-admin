<template>
  <div class="product-page-container">
    <div class="tw-flex bg-white mb-10 pa-5">
      <v-row>
        <v-col cols="12" md="3">
          <StatCard title="Number of Warehouse" :value="pagination.total" type="blue"/>
        </v-col>
      </v-row>
    </div>
    {{canCreateProduct}}
    <TableWrapper
      tableName="warehouse"
      searchLabelText="Search By Warehouse Name"
      :createBtnText="canCreateProduct ? 'Create Warehouse': null"
      @export="fetchWarehouse($event)"
      @search="searchWarehouse($event)"
      @filter="fetchWarehouse($event)"
      @create="createWarehouseModal = true"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="isLoading"
        :items-per-page="20"
        hide-default-footer
        class="elevation-1 custom-table"
      >
        <template v-slot:item.view="{ item }">
          <div class="tw-flex tw-justify-center">
            <ZoomIn class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="tw-flex tw-justify-center">
            <SquarePen @click="openEditModal(item)" class="mr-3 tw-cursor-pointer"/>
          </div>
        </template>
        <template v-slot:bottom>
          <TableFooter v-bind="pagination"  @next="next($event)"  />
        </template>
      </v-data-table>
    </TableWrapper>
    <CreateWarehouse
      :open-modal="createWarehouseModal"
      @close="createWarehouseModal = false"
      @completed="handleCreateCompleted()"
    />
    <EditWarehouse
      :open-modal="editWarehouseModal"
      @close="editWarehouseModal = false"
      @completed="handleEditCompleted()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SquarePen, ZoomIn } from 'lucide-vue-next'
import { useAuthStore, useWarehouseStore } from '@/stores';
import { Warehouse } from '@/types';
import {  QueryFilter } from '@/types';
import { SAVED_ADMIN_ROLE } from '@/constants';


// ========= COMPONENTS =========== //
import StatCard from './components/cards/ProductStatCard.vue'
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import CreateWarehouse from './components/modals/CreateWarehouse.vue'
import EditWarehouse from './components/modals/EditWarehouse.vue'

const authStore = useAuthStore();
const warehouseStore = useWarehouseStore();
const isLoading = ref(false);
const createWarehouseModal = ref(false);
const editWarehouseModal = ref(false);
const headers = ref<any[]>([
  {
    title: "NAME OF WAREHOUSE",
    align: "start",
    key: "warehouse_name",
  },
  { title: "STATE", key: "state.name" },
  { title: "MANAGER NAME", key: "manager_name" },
  { title: "PHONE NUMBER", key: "phone" },
  // { title: "VIEW", key: "view", align: 'center' },
  { title: "ACTION", key: "action", align: 'center' },
])

const items = computed<Warehouse[]>(() => {
  return warehouseStore.warehouses;
});
const queryFilter = ref<QueryFilter>({
  page: 1,
});

const pagination = computed(() => {
  return warehouseStore.warehousesPagination || {
    total: 0,
    currentPageTotal: 0,
    currentPageNo: 1,
    totalNoPages: 1
  }
})

// =============== METHODS ================= //
function openEditModal(item: Warehouse) {
  const data = { ...item };
  warehouseStore.selectedWarehouse = data;
  editWarehouseModal.value = true;
}

function handleCreateCompleted() {
  createWarehouseModal.value = false;
  fetchWarehouse(queryFilter.value);
}

function handleEditCompleted() {
  editWarehouseModal.value = false;
  fetchWarehouse(queryFilter.value);
}

const next = (page: number) => {
  queryFilter.value.page = page

  fetchWarehouse(queryFilter.value)
}

const canCreateProduct = computed(()=>{  
  let roles = [
      "superadmin",
      "accountant",
      "internal_control_manager",
      "business_development_manager"
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE);

  return roles.includes(adminRole);})

const searchWarehouse = (query: string) => {
  queryFilter.value.search = query

  fetchWarehouse(queryFilter.value)
}

async function fetchWarehouse(query?:any) {
  isLoading.value = true;
  try {
    await warehouseStore.fetchAllWarehouses(query);
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
}

(async function loadData() {
  authStore.toggleLoader();
  try {
    await warehouseStore.fetchAllWarehouses();
    await warehouseStore.fetchStates();
  } catch (error) {
    console.log(error)
  }
  authStore.toggleLoader();
})()

</script>

<style lang="scss" scoped>

</style>
