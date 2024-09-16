<template>
    <app-tab :tabTitles="tabTitles" class="mt-5">
       <!-- New Return Request Table -->
       <template #new_return_request>
           <NewReturnedOrders
            :items="newOrdersTableData"
            :loading="loading"
            :pagination="return_requests.pagination"
            class="elevation-1 custom-table"
            @declineRequest="declineRequest($event)"
            @fetchMore="fetchContent($event)"
            @refreshData ="fetchContent()"
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

import { useOrderStore, useAuthStore } from "@/stores";
import { formatDate, formatTime, formatAsMoney, formatText, capitalizeFirstLeters } from "@/utils";


const orderStores  = useOrderStore()
const authStore = useAuthStore()

const { return_requests } = storeToRefs(orderStores)

const loading = ref(false);

const returnType = ref({
    FULL_RETURN: "Full Return",
    HALF_RETURN: "Partial Return",
})

const itemToProcess = ref({})
const tabTitles = ref([ "new return request", "approved", "declined"]);

const newOrdersTableData = computed(()=>{
    return return_requests.value?.data?.map((elm:any)=>{
        return  {
            order_number: elm.order_no,
            date: formatDate(elm.created_at),
            reseller_name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            warehouse: formatText(elm.warehouse),
            return_type: returnType.value[elm.return_type],
            amount_return: formatAsMoney(elm.amount_to_return),
            amount_retain: formatAsMoney(elm.amount_to_retain),
        }      
    })
  
})

const fetchContent = async (query?: any) => {
    loading.value = true;
    await orderStores.fetchReturnRequest(query);
    loading.value = false;
}

const declineRequest = async(requestId: string) => {
    orderStores.ApproveDeclineReturn({requestId, action: "approve"});
}

onMounted( async ()=>{
    authStore.toggleLoader();
    await fetchContent()
    authStore.toggleLoader();
})
</script>
