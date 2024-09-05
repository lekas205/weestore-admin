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
      <template v-slot:item.name="{ item }">
        <div class="tw-flex tw-items-center">
          <div class="mr-3">
            <TableImage :url="item.icon" />
          </div>
          <p class="tw-text-nowrap">
            {{ item.name }}
          </p>
        </div>
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
import { formatAsMoney } from '@/utils'
import { Pagination } from '@/types'
import LoginImage from '@/assets/images/png/login-image.png'

// ================ COMPONENTS ================ //
import TableWrapper from '@/components/AppTableWrapper.vue'
import TableFooter from '@/components/AppTableFooter.vue'
import TableImage from '@/components/AppTableImage.vue'

const isLoading = ref(false);
const headers = ref<any[]>([
  {
    title: "PRODUCT NAME",
    align: 'start',
    key: "name",
  },
  { title: "CATEGORY", key: "category" },
  { title: "MANUFACTURER", key: "manufacturer" },
  { title: "WAREHOUSE", key: "warehouse" },
  { title: "SALES PRICE", key: "price" },
  { title: "QTY-A", key: "quantity" },
  { title: "STATUS", key: "statue" },
  { title: "VIEW", key: "action" },
  { title: "PUBLISHED", key: "isPublished" },
  { title: "ACTION", key: "action", align: 'center' },
]);

const items = computed<any[]>(() => {
  return [
    {
      name: 'Nivea Roll On',
      icon: LoginImage,
      category: 'Men',
      manufacturer: 'Friesland',
      warehouse: 'Ikotun',
      price: formatAsMoney(30000),
      isPublished: false,
    },
  ]
});

const pagination = computed<Pagination>(() => {
  return {
    total: 0,
    currentPageTotal: 0,
    currentPageNo: 1,
    totalNoPages: 1
  }
});

</script>

<style scoped>

</style>