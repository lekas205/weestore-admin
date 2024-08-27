<template>
  <div class="page-container">
    <v-row class="summary-card-wrapper">
      <v-col cols="12" md="3">
        <div class="summary-card">
          <p class="mb-2">
            Product Category
          </p>
          <p class="tw-text-xl tw-font-medium">
            70
          </p>
        </div>
      </v-col>
    </v-row>
    <BaseTable @newItem="openCreateModal = true">
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
          <div class="table-action">
            <ZoomIn class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="table-action">
            <SquarePen @click="openEditModal = true" class="mr-3 tw-cursor-pointer" />
            <Trash2 @click="openDeleteModal = true" class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:bottom>
          <div class="table-footer">
            <div class="footer-text">
              <p>
                Showing 
                {{ pagination.page }}-{{ pagination.page + 3 }} of 
                {{ pagination.totalNoPages }}
              </p>
            </div>
            <div class="pagination-wrapper">
              <v-pagination
                v-model="pagination.page"
                :length="pagination.totalNoPages"
                :total-visible="5"
              ></v-pagination>
            </div>
          </div>
        </template>
      </v-data-table>
    </BaseTable>
    <CreateCategory :open-modal="openCreateModal" @close="openCreateModal = false" />
    <EditCategory :open-modal="openEditModal" @close="openEditModal = false" />
    <DeleteCategory :open-modal="openDeleteModal" @close="openDeleteModal = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Trash2, Plus, SquarePen, ZoomIn } from 'lucide-vue-next'
import LoginImage from '@/assets/images/png/login-image.png'
import BaseTable from './components/BaseTable.vue'
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
const headers = ref([
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

// function open(params:type) {}

</script>

<style lang="scss" scoped>
.page-container {
  padding-left: 2rem;
  padding-right: 2rem;
  margin-top: 2rem;
}

.summary-card-wrapper {
  background-color: white;
}

.summary-card {
  border-radius: 12px;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(0deg, #06177A, #06177A);
  box-shadow: 0px 4px 4px 0px #071C9640;
}

.table-icon {
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 2.5rem;
  height: 2.5rem;
}

.table-action {
  display: flex;
  justify-content: center;
}

.table-footer {
  display: flex;
  padding-right: 1rem;
  padding-left: 1rem;
  justify-content: space-between;
  border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.footer-text {
  display: flex;
  align-items: center;
}
</style>
