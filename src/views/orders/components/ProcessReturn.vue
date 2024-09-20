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
            @fetchMore="getNewRequests($event)"
            @refreshData ="getNewRequests()"
            @filter="getNewRequests($event)"
           >
           </NewReturnedOrders>
       </template>
       <!-- Request Approval Table -->
       <template #approved>
           <OrderRequestApproval
            :items="approvedOrdersRReturnRequest"
            :loading="loading"
            :pagination="approved_return_requests.pagination"
            class="elevation-1 custom-table"
            @filter="getApprovedRequests($event)"
            @fetchMore="getApprovedRequests($event)"
           >
           </OrderRequestApproval>
       </template>
        <!-- Request Declined Table -->
        <template #declined>
           <DeclinedRequest
            :items="declinedOrdersRReturnRequest"
            :loading="loading"
            :pagination="declined_return_requests.pagination"
            class="elevation-1 custom-table"
            @filter="getDeclinedRequests($event)"
            @fetchMore="getDeclinedRequests($event)"
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

const { return_requests, declined_return_requests, approved_return_requests } = storeToRefs(orderStores)

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

const approvedOrdersRReturnRequest= computed(()=>{
    return approved_return_requests.value?.data?.map((elm:any)=>{
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

const declinedOrdersRReturnRequest= computed(()=>{
    return declined_return_requests.value?.data?.map((elm:any)=>{
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
    await Promise.all([
        orderStores.fetchReturnRequest(query),
        orderStores.fetchApprovedReturnRequest(query),
        orderStores.fetchDeclinedReturnRequest(query)
    ])
    loading.value = false;
}

const getNewRequests = async (query: any) => {
    loading.value = true;
    await  orderStores.fetchReturnRequest(query)
    loading.value = false;
}

const getApprovedRequests = async (query: any) => {
    loading.value = true;
    await  orderStores.fetchApprovedReturnRequest(query)
    loading.value = false;
}

const getDeclinedRequests = async (query: any) => {
    loading.value = true;
    await  orderStores.fetchApprovedReturnRequest(query)
    loading.value = false;
}

const declineRequest = async(requestId: string) => {
    await orderStores.ApproveDeclineReturn({requestId, action: "decline"});
    orderStores.fetchReturnRequest();
}

onMounted( async ()=>{
    authStore.toggleLoader();
    await fetchContent()
    authStore.toggleLoader();
})
</script>
