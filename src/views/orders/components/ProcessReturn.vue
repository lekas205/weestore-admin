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
import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";

import NewReturnedOrders from "./Tables/Return/NewReturnedOrders.vue";
import OrderRequestApproval from "./Tables/Return/RequestApproval.vue";
import DeclinedRequest from "./Tables/Return/DeclinedRequest.vue";

import { useOrderStore } from "@/stores";

const orderStores  = useOrderStore()

const { return_requests } = storeToRefs(orderStores)

const loading = ref(false);

const tabTitles = ref([ "new return request", "approved", "declined"]);
const newOrdersTableData = computed(()=>{
    return  [{
        "order_number": "Ela John",
        "date": "May 16 2024",
        "reseller_name": "Nivea Roll on",
        "warehouse": 2000,
        "return_type": 2400,
        "amount_return": "BANK TRANSFER",
        "amount_retain": "Full Delivery",
    }]
})

onMounted( async ()=>{
    await orderStores.fetchReturnRequest()
    console.log(return_requests.value);
    
})
</script>
