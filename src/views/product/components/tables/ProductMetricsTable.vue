<template>
  <TableWrapper
    searchLabelText="Search product by name"
    tableName="productMetrics"
    @search="search"
    @export="loadProductMetrics($event)"
    @filter="loadProductMetrics($event)"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="isLoading"
      :items-per-page="20"
      hide-default-footer
      class="elevation-1 custom-table"
    >
      <template v-slot:item.name="{ item }">
        <div class="tw-flex tw-items-center">
          <!-- <div class="mr-3">
            <TableImage :url="item.icon" />
          </div> -->
          <p class="tw-text-nowrap">
            {{ item.product_name }}
          </p>
        </div>
      </template>

      <template v-slot:item.price="{ item }">
        {{ $formatAsMoney(item.price) }}
      </template>

      <template v-slot:item.stock_quantity="{ item }">
        {{ $formatAsMoney(item.stock_quantity, false) }}
      </template>

      <template v-slot:item.quantity_bought="{ item }">
        {{ $formatAsMoney(item.quantity_bought, false) }}
      </template>

      <template v-slot:item.in_stock_value="{ item }">
        {{ $formatAsMoney(item.in_stock_value) }}
      </template>

      <template v-slot:item.out_stock_value="{ item }">
        {{ $formatAsMoney(item.out_stock_value) }}
      </template>

      <!-- Table Footer -->
      <template v-slot:bottom>
        <TableFooter v-bind="pagination" />
      </template>
    </v-data-table>
  </TableWrapper>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Pagination, ProductMetrics, QueryFilter } from '@/types'
import { useProductStore } from '@/stores'

// ================ COMPONENTS ================ //
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import TableImage from '@/components/AppTableImage.vue'

const productStore = useProductStore();

const isLoading = ref(false);
const items = computed<ProductMetrics[]>(() => productStore.productMetricsList);
const pagination = computed<Pagination>(() => productStore.productMetricsPagination);
const queryFilter = ref<QueryFilter>({ page: 1 });
const headers = ref<any[]>([
  {
    title: "PRODUCT NAME",
    align: 'start',
    key: "product_name",
  },
  { title: "CATEGORY", key: "category" },
  { title: "MANUFACTURER", key: "manufacturer" },
  { title: "WAREHOUSE", key: "warehouse_name" },
  { title: "SALES PRICE", key: "price" },
  { title: "QTY-A", key: "stock_quantity" },
  { title: "QTY-B", key: "quantity_bought" },
  { title: "Value Of Qty In Stock", key: "in_stock_value" },
  { title: "Value Of Qty Out Of Stock", key: "out_stock_value" },
]);

function handleNextPage(page: number) {
  queryFilter.value.page = page;
  loadProductMetrics(queryFilter.value);
}

const search = (text: string) => {
  queryFilter.value.search = text;
  queryFilter.value.page = 1;
  loadProductMetrics(queryFilter.value)
}

async function loadProductMetrics(query?:any) {
  isLoading.value = true;
  try {
    await productStore.fetchProductMetrics(query);
  } catch (error) {
   console.log(error);
  }
  isLoading.value = false;
}

// ============ ON DEFORE MOUNTED ================ //
(async function() {
  loadProductMetrics(queryFilter.value);
})()

</script>

<style scoped>

</style>