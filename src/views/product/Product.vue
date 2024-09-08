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
          <button class="table-btn green-btn" @click="createProductModal = true">
            <Plus class="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item>
          <ProductInfoTable
            :referesh-data="refreshProductInfo"
            @refresh-done="refreshProductInfo = false"
            @edit-product="editProductModal = true"
          />
        </v-tabs-window-item>

        <v-tabs-window-item>
          <ProductMetricsTable></ProductMetricsTable>
        </v-tabs-window-item>
      </v-tabs-window>
    </div>
    <CreateProduct
      :open-modal="createProductModal"
      @close="createProductModal = false"
      @completed="handleCreateCompleted()"
    />
    <EditProduct
      :open-modal="editProductModal"
      @close="editProductModal = false"
    />
  </div>
  <AppPageLoader v-if="isLoading" /> 
</template>

<script suspense setup lang="ts">
import { ref, } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useCategoryStore, useWarehouseStore } from '@/stores'

// ================ COMPONENTS ============== //
import ProductSummary from './components/cards/ProductSummary.vue'
import ProductInfoTable from './components/tables/ProductInformationTable.vue'
import ProductMetricsTable from './components/tables/ProductMetricsTable.vue'
import CreateProduct from './components/modals/CreateProduct.vue'
import EditProduct from './components/modals/EditProduct.vue'
import AppPageLoader from '@/components/AppPageLoader.vue'

const categoryStore = useCategoryStore();
const warehouseStore = useWarehouseStore();

const isLoading = ref(false);
const createProductModal = ref(false);
const editProductModal = ref(false);
const tab = ref<any>(0);
const refreshProductInfo = ref(false);
const productSummary = ref({
  totalSales: 3000,
  valueOfQtyInStock: 3000000,
  quantityInStock: 7000,
  quantityOutOfStock: 30000,
});

// ============= METHODS ============= //

function handleCreateCompleted() {
  createProductModal.value = false;
  refreshProductInfo.value = true;
}

(async function() {
  isLoading.value = true;
  try {
    await Promise.all([
      categoryStore.fetchAllCategories(),
      warehouseStore.fetchStates(),
    ])
  } catch (error) {
   console.log(error);
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
  margin-bottom: 1rem;
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
