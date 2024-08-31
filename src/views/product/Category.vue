<template>
  <div class="product-page-container">
    <v-row class="bg-white">
      <v-col cols="12" md="3">
        <div class="product-summary card-blue">
          <p class="mb-2">
            Product Category
          </p>
          <p class="tw-text-xl tw-font-medium">
            70
          </p>
        </div>
      </v-col>
    </v-row>
    <TableWrapper
      searchLabelText="Search by Category Name"
      createBtnText="Add Category"
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
          <div class="table-image" :style="{'background-image': `url(${item.icon})`}"></div>
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
            <SquarePen @click="openEditModal = true" class="mr-3 tw-cursor-pointer" />
            <Trash2 @click="openDeleteModal = true" class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:bottom>
          <TableFooter />
        </template>
      </v-data-table>
    </TableWrapper>
    <CreateCategory :open-modal="openCreateModal" @close="openCreateModal = false" />
    <EditCategory :open-modal="openEditModal" @close="openEditModal = false" />
    <DeleteCategory :open-modal="openDeleteModal" @close="openDeleteModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Trash2, SquarePen, ZoomIn } from 'lucide-vue-next'
import LoginImage from '@/assets/images/png/login-image.png'
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import CreateCategory from './components/modals/CreateCategory.vue'
import EditCategory from './components/modals/EditCategory.vue'
import DeleteCategory from './components/modals/DeleteCategory.vue'

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
    title: "ID",
    align: "start",
    key: "id",
  },
  { title: "ICON", key: "icon" },
  { title: "NAME", key: "product" },
  { title: "DESCRIPTION", key: "description" },
  { title: "PUBLISHED", key: "isPublished" },
  { title: "VIEW", key: "view", align: 'center' },
  { title: "ACTION", key: "action", align: 'center' },
])

const items = ref<any[]>([
  {
    id: '1D44',
    icon: LoginImage,
    product: 'Men',
    description: 'Men Product',
    isPublished: false,
  },
  {
    id: '1D44',
    icon: LoginImage,
    product: 'Men',
    description: 'Men Product',
    isPublished: false,
  },
  {
    id: '1D44',
    icon: LoginImage,
    product: 'Men',
    description: 'Men Product',
    isPublished: false,
  },
  {
    id: '1D44',
    icon: LoginImage,
    product: 'Men',
    description: 'Men Product',
    isPublished: false,
  }
]);
</script>

<style lang="scss" scoped>

</style>
