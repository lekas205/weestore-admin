<template>
  <div class="product-page-container">
    <div class="tw-flex bg-white mb-10 pa-5">
      <v-row>
        <v-col cols="12" md="3">
          <StatCard title="Product Category" :value="pagination.total" type="blue"/>
        </v-col>
      </v-row>
    </div>
    <TableWrapper
      searchLabelText="Search by Category Name"
      :createBtnText="canHandle ?' Add Category': ''"
      @create="createCategoryModal = true"
      @search="searchCategories"
      @filter="filterCategories"
      @export="filterCategories($event)"
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
          <TableImage :url="item.icon" />
        </template>
        <template v-slot:item.view="{ item }">
          <div class="tw-flex tw-justify-center">
            <ZoomIn class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <div class="tw-flex tw-justify-center">
            <SquarePen @click="openEditModal(item)" class="mr-3 tw-cursor-pointer" />
            <Trash2 @click="openDeleteModal(item)" class="tw-cursor-pointer" />
          </div>
        </template>
        <template v-slot:bottom>
          <TableFooter v-bind="pagination" @next="next($event)"  />
        </template>
      </v-data-table>
    </TableWrapper>
    <CreateCategory
      :open-modal="createCategoryModal"
      @close="createCategoryModal = false"
      @completed="handleCreateCompleted()"
    />
    <EditCategory
      :open-modal="editCategoryModal"
      @close="editCategoryModal = false"
      @completed="handleEditCompleted()"
    />
    <DeleteCategory
      :open-modal="deleteCategoryModal"
      @close="deleteCategoryModal = false"
      @completed="handleDeleteCompleted()"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trash2, SquarePen, ZoomIn } from 'lucide-vue-next'
import { useAuthStore, useCategoryStore } from '@/stores';
import { Category, Pagination, QueryFilter } from '@/types';
import { SAVED_ADMIN_ROLE } from '@/constants';

// ========= COMPONENTS =========== //
import StatCard from './components/cards/ProductStatCard.vue'
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import TableImage from '@/components/AppTableImage.vue'
import CreateCategory from './components/modals/CreateCategory.vue'
import EditCategory from './components/modals/EditCategory.vue'
import DeleteCategory from './components/modals/DeleteCategory.vue'

const authStore = useAuthStore();
const categoryStore = useCategoryStore();
const isLoading = ref(false);
const createCategoryModal = ref(false);
const editCategoryModal = ref(false);
const deleteCategoryModal = ref(false);



const canHandle=  computed(()=>{  
  let roles = [
      "superadmin",
      "accountant",
      "internal_control_manager",
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE) as string;

  return roles.includes(adminRole);
})

const headers = computed<any>(()=> [
  {
    title: "ID",
    align: "start",
    key: "category_id",
  },
  { title: "ICON", key: "icon" },
  { title: "NAME", key: "category_name" },
  { title: "DESCRIPTION", key: "description" },
  // { title: "PUBLISHED", key: "isPublished" },
  // { title: "VIEW", key: "view", align: 'center' },
  canHandle.value ?  { title: "ACTION", key: "action", align: 'center' }: {},
]);
const queryFilter = ref<QueryFilter>({
  page: 1,
});

const items = computed<Category[]>(() => {
  return categoryStore.categories;
});

const pagination = computed<Pagination>(() => {
  return categoryStore.categoriesPagination || {
    total: 0,
    currentPageTotal: 0,
    currentPageNo: 1,
    totalNoPages: 1
  }
});



// =============== METHODS ================= //
function openEditModal(item: Category) {
  const data = { ...item };
  categoryStore.selectedCategory = data;
  editCategoryModal.value = true;
}

function openDeleteModal(item: Category) {
  const data = { ...item };
  categoryStore.selectedCategory = data;
  deleteCategoryModal.value = true;
}

function handleCreateCompleted() {
  createCategoryModal.value = false;
  fetchCategories();
}

function handleEditCompleted() {
  editCategoryModal.value = false;
  fetchCategories();
}

function handleDeleteCompleted() {
  deleteCategoryModal.value = false;
  fetchCategories();
}

async function searchCategories(value: string) {
  queryFilter.value = {
    search: value,
    page: 1,
  }
  await fetchCategories();
}
const next = (page: number) => {
  queryFilter.value.page = page

  fetchCategories()
}


async function filterCategories(filter: any) {
  queryFilter.value = {
    ...filter,
    page: 1,
  }
  await fetchCategories();
}

async function fetchCategories() {
  isLoading.value = true;
  try {
    await categoryStore.fetchAllCategories({ ...queryFilter.value });
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
}

(async function loadData() {
  authStore.toggleLoader();
  try {
    await categoryStore.fetchAllCategories();
  } catch (error) {
    console.log(error)
  }
  authStore.toggleLoader();
})()
</script>

<style lang="scss" scoped>
</style>
