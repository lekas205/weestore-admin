<template>
  <TableWrapper
    searchLabelText="Search product by name"
  >
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="isLoading"
      :items-per-page="20"
      hide-default-footer
      class="elevation-1 custom-table"
    >
      <template v-slot:item.product_name="{ item }">
        <div class="tw-flex tw-items-center">
          <div class="mr-3">
            <TableImage :url="getProductImage(item.images)" />
          </div>
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

      <template v-slot:item.status="{ item }">
        <v-chip :color="getStatusColor(item.status)" variant="flat">
          {{ item.status }}
        </v-chip>
      </template>

      <template v-slot:item.view="{ item }">
        <div class="tw-flex tw-justify-center">
          <ZoomIn class="tw-cursor-pointer" />
        </div>
      </template>

      <template v-slot:item.published="{ item }">
        <v-switch
          v-model="item.published"
          color="rgba(12, 174, 19, 1)"
          hide-details
          inset
          @update:modelValue="handlePublishToggle($event, item)"
        ></v-switch>
      </template>

      <template v-slot:item.action="{ item }">
        <div class="tw-flex tw-justify-center">
          <SquarePen @click="handleEditAction(item)" class="mr-3 tw-cursor-pointer" />
        </div>
      </template>

      <!-- Table Footer -->
      <template v-slot:bottom>
        <TableFooter v-bind="pagination" @next="handleNextPage" />
      </template>
    </v-data-table>
  </TableWrapper>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ZoomIn, SquarePen } from 'lucide-vue-next'
import { Pagination, Product, QueryFilter } from '@/types'
import { useProductStore } from '@/stores'

// ================ COMPONENTS ================ //
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import TableImage from '@/components/AppTableImage.vue'
import { openToastNotification } from '@/utils'

const emit = defineEmits(['refreshDone', 'editProduct']);

const props = defineProps({
  refereshData: {
    type: Boolean,
    default: false,
  }
})

const productStore = useProductStore();

const isLoading = ref(false);
const items = computed<Product[]>(() => productStore.productList);
const pagination = computed<Pagination>(() => productStore.productPagination);
const queryFilter = ref<QueryFilter>({ page: 1 });
const headers = ref<any[]>([
  {
    title: 'PRODUCT NAME',
    align: 'start',
    key: 'product_name',
  },
  { title: 'CATEGORY', key: 'category' },
  { title: 'MANUFACTURER', key: 'manufacturer' },
  { title: 'WAREHOUSE', key: 'warehouse_name' },
  { title: 'SALES PRICE', key: 'price' },
  { title: 'QTY-A', key: 'stock_quantity' },
  { title: 'STATUS', key: 'status' },
  { title: 'VIEW', key: 'view' },
  { title: 'PUBLISHED', key: 'published' },
  { title: 'ACTION', key: 'action', align: 'center' },
]);

watch(() => props.refereshData, async (newValue) => {
  if (newValue === true) {
    await loadProducts();
  }
  emit('refreshDone');
})

// =================== METHODS ============= //
function getStatusColor(status: string) {
  return status === 'Selling' ? 'rgba(220, 251, 235, 1)' : 'rgba(254, 0, 0, 0.15)'
}

function getProductImage(images: Product['images']): string {
  return (images.find(i => i.isPrimary))?.imageUrl || '';
}

function handleEditAction(item: Product) {
  productStore.selectedProduct = {...item};
  emit('editProduct');
}

async function handlePublishToggle(value: any, item: Product) {
  isLoading.value = true;
  let success = false;
  if (value == true) {
    success = await productStore.publishProduct(item.product_id);
  }
  else {
    success = await productStore.unpublishProduct(item.product_id);
  }
  isLoading.value = false;

  if (success) {
    await loadProducts();
    openToastNotification({
      message: `Product ${value ? 'Published' : 'Unpublished'} Successfully `
    })
  }
}

function handleNextPage(page: number) {
  queryFilter.value.page = page;
  loadProducts();
}

async function loadProducts() {
  isLoading.value = true;
  try {
    await productStore.fetchProducts({ ...queryFilter.value });
  } catch (error) {
   console.log(error);
  }
  isLoading.value = false;
}

// ============ ON DEFORE MOUNTED ================ //
(async function() {
  loadProducts();
})()
</script>

<style scoped>

</style>