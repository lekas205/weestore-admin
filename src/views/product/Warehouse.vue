<template>
  <div class="product-page-container">
    <v-row class="bg-white">
      <v-col cols="12" md="3">
        <div class="product-summary card-blue">
          <p class="mb-2">
            Number of Warehouse
          </p>
          <p class="tw-text-xl tw-font-medium">
            70
          </p>
        </div>
      </v-col>
    </v-row>
    <TableWrapper
      searchLabelText="Search By Warehouse Name"
      createBtnText="Create Warehouse"
      @create="openCreateModal = true"
    >
      <v-data-table
        :headers="headers"
        :items="items"
        :loading="isLoading"
        :items-per-page="20"
        hide-default-footer
        class="elevation-1 custom-table"
      >
        <template v-slot:item.icon="{ item }">
          <div class="table-icon" :style="{'background-image': `url(${item.icon})`}"></div>
        </template>
        <template v-slot:item.isPublished="{ item }">
          <v-switch
            v-model="item.isPublished"
            color="rgba(12, 174, 19, 1)"
            inset
            hide-details
          ></v-switch>
        </template>
        <template v-slot:item.view="{ item }">
          <div class="tw-flex tw-justify-center">
            <ZoomIn class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="tw-flex tw-justify-center">
            <SquarePen
              @click="openEditModal = true"
              class="mr-3 tw-cursor-pointer"
            />
          </div>
        </template>
        <template v-slot:bottom>
          <TableFooter />
        </template>
      </v-data-table>
    </TableWrapper>
    <CreateWarehouse :open-modal="openCreateModal" @close="openCreateModal = false" />
    <EditWarehouse :open-modal="openEditModal" @close="openEditModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SquarePen, ZoomIn } from 'lucide-vue-next'
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import CreateWarehouse from './components/modals/CreateWarehouse.vue'
import EditWarehouse from './components/modals/EditWarehouse.vue'

const isLoading = ref(false);
const openCreateModal = ref(false);
const openEditModal = ref(false);
const openDeleteModal = ref(false);
const pagination = ref({
  page: 1,
  totalNoPages: 100,
})
const headers = ref<any[]>([
  {
    title: "NAME OF WAREHOUSE",
    align: "start",
    key: "name",
  },
  { title: "STATE", key: "state" },
  { title: "MANAGER NAME", key: "manager" },
  { title: "PHONE NUMBER", key: "phone" },
  { title: "VIEW", key: "view", align: 'center' },
  { title: "ACTION", key: "action", align: 'center' },
])

const items = ref<any[]>([
  {
    name: 'Mercy Store',
    state: 'Lagos',
    manager: 'Alex Joshua',
    phone: '09138208161',
  },
  {
    name: 'Mercy Store',
    state: 'Lagos',
    manager: 'Alex Joshua',
    phone: '09138208161',
  },
  {
    name: 'Mercy Store',
    state: 'Lagos',
    manager: 'Alex Joshua',
    phone: '09138208161',
  },
  {
    name: 'Mercy Store',
    state: 'Lagos',
    manager: 'Alex Joshua',
    phone: '09138208161',
  },
]);

</script>

<style lang="scss" scoped>

</style>
