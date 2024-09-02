<template>
  <div class="product-page-container">
    <ProductSummary v-bind="productSummary" />
    <div class="pa-7 mt-6">
      <div class="product-tabs">
        <div class="tab-container">
          <div class="tab-text mr-5" :class="{ 'active': tab == 0 }" @click="tab = 0">
            Product Information
          </div>
          <div class="tab-text" :class="{ 'active': tab == 1 }" @click="tab = 1">
            Product Metrics
          </div>
        </div>
        <div class="action-container">
          <button class="table-btn green-btn" @click="openCreateModal = true">
            <Plus class="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <ProductInfoTable></ProductInfoTable>
        </v-tabs-window-item>

        <v-tabs-window-item>
          Two
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
    <CreateProduct
      :open-modal="openCreateModal"
      @close="openCreateModal = false"
      :states="states"
      :categories="categories"
    />
  </div>
  <AppPageLoader v-if="isLoading" /> 
</template>

<script suspense setup lang="ts">
import { onBeforeMount, ref, } from 'vue'
import { Plus } from 'lucide-vue-next'
import ProductSummary from './components/cards/ProductSummary.vue'
import ProductInfoTable from './components/tables/ProductInformationTable.vue'
import CreateProduct from './components/modals/CreateProduct.vue'
import AppPageLoader from '@/components/AppPageLoader.vue'
import { useCategoryStore, useWarehouseStore } from '@/stores'
import { Category } from '@/types'

const isLoading = ref(false);
const categoryStore = useCategoryStore();
const warehouseStore = useWarehouseStore();
const tab = ref<any>(0);
const productSummary = ref({
  totalSales: 3000,
  valueOfQtyInStock: 3000000,
  quantityInStock: 7000,
  quantityOutOfStock: 30000,
});
const openCreateModal = ref(false);
const categories = ref<Category[]>([]);
const states = ref([]);

(async function loadData() {
  isLoading.value = true;
  try {
    const result = await categoryStore.fetchAllCategories();
    states.value = await warehouseStore.fetchStates();

    if (result) {
      categories.value = result.rows || [];
    }
  } catch (error) {
   console.log(error) 
  }
  isLoading.value = false;
})()
</script>

<style scoped lang="scss">
.product-tabs {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 1rem;
}

.tab-container {
  flex: 0 0 40%;
  display: flex;
  align-items: flex-end;
}

.action-container {
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
}

.tab-text {
  font-size: 1.35rem;
  padding-top: 1rem;
  color: #AEADADDE;
  cursor: pointer;

  &.active {
    color: black;
  }
}
</style>
