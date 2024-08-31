<template>
  <AppTableWrapper>
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
            <div class="table-icon" :style="{'background-image': `url(${item.icon})`}"></div>
          </div>
          <p class="tw-text-nowrap">
            {{ item.name }}
          </p>
        </div>
      </template>

      <!-- Table Footer -->
      <template v-slot:bottom>
        <AppTableFooter></AppTableFooter>
      </template>
    </v-data-table>
  </AppTableWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { formatAsMoney } from '@/utils'
import AppTableWrapper from '@/components/AppTableWrapper.vue';
import AppTableFooter from '@/components/AppTableFooter.vue';
import LoginImage from '@/assets/images/png/login-image.png'


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

const items = ref<any[]>([
  {
    name: 'Nivea Roll On',
    icon: LoginImage,
    category: 'Men',
    manufacturer: 'Friesland',
    warehouse: 'Ikotun',
    price: formatAsMoney(30000),
    isPublished: false,
  },
])

</script>

<style scoped>

</style>