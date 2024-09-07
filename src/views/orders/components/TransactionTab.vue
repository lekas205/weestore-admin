<template>
    <app-tab :tabTitles="tabTitles" class="mt-5">
       <!-- New Orders Table -->
       <template #new_orders>
         <app-table-wrapper searchLabelText="Search by Order Number">
           <new-order-table
            :items="newOrdersTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </new-order-table>
         </app-table-wrapper>
       </template>

       <!-- Delivered Orders Table -->
       <template #delivered_orders>
        <app-table-wrapper searchLabelText="Search by Categories Name">
           <delivered-order-table
            :items="deliveredOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </delivered-order-table>
         </app-table-wrapper>
       </template>

      <!-- Order Returned Table -->
       <template #orders_returned>
         <app-table-wrapper searchLabelText="Search for client" hasDelete>
           <returned-order-table
            :items="returnedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </returned-order-table>
         </app-table-wrapper>
       </template>

        <!-- Completed Orders Table -->
        <template #completed_orders>
         <app-table-wrapper searchLabelText="Search for client">
           <completed-order-table
            :items="completedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </completed-order-table>
         </app-table-wrapper>
       </template>

        <!-- Declined Orders Table -->
        <template #declined_orders>
         <app-table-wrapper searchLabelText="Search for client">
           <declined-order-table
            :items="completedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </declined-order-table>
         </app-table-wrapper>
       </template>
   </app-tab>
</template>

<script lang="ts" setup>
import { ref, computed} from "vue"

import { Pagination } from '@/types'

// ============ Local Componeents ============//
import NewOrderTable from "./Tables/Orders/NewOrderTable.vue";
import ReturnedOrderTable from "./Tables/Orders/ReturnedOrderTable.vue";
import DeliveredOrderTable from "./Tables/Orders/DeliveredOrderTable.vue";
import CompletedOrderTable from "./Tables/Orders/CompletedOrderTable.vue";
import DeclinedOrderTable from "./Tables/Orders/DeclinedOrderTable.vue";

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";
import AppTable from "@/components/AppTable.vue";
import TableFooter from '@/components/AppTableFooter.vue'
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const loading = ref(false)
const newOrdersTableData = ref([
  {
    "order_number": "Ela John",
    "date": "May 16 2024",
    "reseller_name": "Nivea Roll on",
    "warehouse": 2000,
    "channel": 2400,
    "amount": "BANK TRANSFER",
    "status": "Full Delivery",
    "action": "463612More3421543",
  },
])

const cashInflowTableData = ref([
   {
    "order_number": "Ela John",
    "date": "May 16 2024",
    "reseller_name": "Nivea Roll on",
    "warehouse": 2000,
    "channel": 2400,
    "amount": "BANK TRANSFER",
    "status": "delivered",
    "action": "463612More3421543",
   },
])

const completedOrderTableData = ref([
   {
    "order_number": "Ela John",
    "date": "May 16 2024",
    "reseller_name": "Nivea Roll on",
    "warehouse": 2000,
    "channel": 2400,
    "amount": "BANK TRANSFER",
    "status": "delivered",
   },
])

const deliveredOrderTableData = ref([
   {
    "order_number": "Ela John",
    "date": "May 16 2024",
    "reseller_name": "Nivea Roll on",
    "warehouse": 2000,
    "channel": 2400,
    "amount": "BANK TRANSFER",
    "status": "pending",
    "action": "463612More3421543",
   },
])

const returnedOrderTableData = ref([
   {
    "order_number": "Ela John",
    "date": "May 16 2024",
    "reseller_name": "Nivea Roll on",
    "warehouse": 2000,
    "channel": 2400,
    "amount": "BANK TRANSFER",
    "status": "pending",
    "action": "463612More3421543",
   },
])

const tabTitles = ref([ "new orders", "delivered orders", "orders returned", "completed orders", "declined orders"])

const pagination = computed<Pagination>(() => {
 return {
   total: 0,
   currentPageTotal: 0,
   currentPageNo: 1,
   totalNoPages: 1
 }
});
</script>
