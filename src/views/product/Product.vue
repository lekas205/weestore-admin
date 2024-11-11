<template>
  <div class="product-page-container">
    <v-row>
      <v-col :md="3">
        <v-select
          v-model="warehouse_id"
          :items="options"
          item-title="warehouse_name"
          item-value="warehouse_id"
          label="Select warehouse"
      ></v-select>
      </v-col>
      <v-col :md="3" v-if="warehouse_id.length">
      <v-btn color="red" @click="warehouse_id=''">Reset</v-btn>
      </v-col>
    </v-row>
  

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
            :key="reRender"
            :referesh-data="refreshProductInfo"
            @refresh-done="refreshProductInfo = false"
            @edit-product="editProductModal = true"
          />
        </v-tabs-window-item>

        <v-tabs-window-item>
          <ProductMetricsTable  :key="reRender"></ProductMetricsTable>
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
      @completed="handleEditCompleted()"
    />
  </div>
  <AppPageLoader v-if="isLoading" /> 
</template>

<script suspense setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { ref, watch, computed, nextTick } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useCategoryStore, useWarehouseStore, useProductStore } from '@/stores'

// ================ COMPONENTS ============== //
import ProductSummary from './components/cards/ProductSummary.vue'
import ProductInfoTable from './components/tables/ProductInformationTable.vue'
import ProductMetricsTable from './components/tables/ProductMetricsTable.vue'
import CreateProduct from './components/modals/CreateProduct.vue'
import EditProduct from './components/modals/EditProduct.vue'
import AppPageLoader from '@/components/AppPageLoader.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore();
const categoryStore = useCategoryStore();
const warehouseStore = useWarehouseStore();

const reRender = ref<any>(1)
const warehouse_id = ref("")
const isLoading = ref(false);
const createProductModal = ref(false);
const editProductModal = ref(false);
const tab = ref<any>(0);
const refreshProductInfo = ref(false);

const options = computed(()=> warehouseStore.warehouseData.rows);
const productSummary = computed(()=>{
  return {
  totalSales:  productStore.dashboardStats.totalSales,
  valueOfQtyInStock: productStore.dashboardStats.valueOfQuantityInStock,
  quantityInStock: productStore.dashboardStats.quantityInStock,
  quantityOutOfStock: productStore.dashboardStats.qunatityOutOfStock,
  valueOfQtyOutStock: productStore.dashboardStats.valueOfQuantityOutOfStock,
}
})

// ============= METHODS ============= //
watch(()=> warehouse_id.value, (newval: string)=>{
  if(newval){
    router.push("/product?warehouse_id=" + newval)
    fetchDashboardSats()
  }else{
    router.push("/product")
    fetchDashboardSats()
  }

  setTimeout(()=>{
      reRender.value = !reRender.value
    }, 500)
})

const fetchDashboardSats = async () =>{
  isLoading.value = true;
  await productStore.getDashboardStats({
    warehouseId:warehouse_id.value
  })
  isLoading.value = false;
}

function handleCreateCompleted() {
  createProductModal.value = false;
  refreshProductInfo.value = true;
}

function handleEditCompleted() {
  editProductModal.value = false;
  refreshProductInfo.value = true;
}

(async function() {
  isLoading.value = true;
  if(route.query.warehouse_id) warehouse_id.value = route.query.warehouse_id as string
  try {
    await Promise.all([
      categoryStore.fetchAllCategories(),
      warehouseStore.fetchStates(),
      productStore.getDashboardStats(),
      warehouseStore.fetchAllWarehouses()
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
