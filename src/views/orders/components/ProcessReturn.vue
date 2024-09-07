<template>
    <app-tab :tabTitles="tabTitles" class="mt-5">
       <!-- New Return Request Table -->
       <template #new_return_request>
           <NewReturnedOrders
            :items="newOrdersTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </NewReturnedOrders>
       </template>
       <!-- Request Approval Table -->
       <template #approved>
           <OrderRequestApproval
            :items="newOrdersTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </OrderRequestApproval>
       </template>
        <!-- Request Declined Table -->
        <template #declined>
           <DeclinedRequest
            :items="newOrdersTableData"
            :loading="loading"
            class="elevation-1 custom-table"
           >
           </DeclinedRequest>
       </template>
   </app-tab>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";

import NewReturnedOrders from "./Tables/Return/NewReturnedOrders.vue";
import OrderRequestApproval from "./Tables/Return/RequestApproval.vue";
import DeclinedRequest from "./Tables/Return/DeclinedRequest.vue";

const loading = ref(false)
const tabTitles = ref([ "new return request", "approved", "declined"])
const newOrdersTableData = ref([
    {
        "order_number": "Ela John",
        "date": "May 16 2024",
        "reseller_name": "Nivea Roll on",
        "warehouse": 2000,
        "return_type": 2400,
        "amount_return": "BANK TRANSFER",
        "amount_retain": "Full Delivery",
    }
])
</script>
