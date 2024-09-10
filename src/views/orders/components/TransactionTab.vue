<template>
    <app-tab :tabTitles="tabTitles" class="mt-5">
       <!-- New Orders Table -->
       <template #new_orders>
         <app-table-wrapper searchLabelText="Search by Order Number">
          <new-order-table
           :loading="loading"
            :items="newOrdersTableData"
            :pagination="new_orders?.pagination"
            class="elevation-1 custom-table"
            @fetchMore="fetchNewOrders($event)"
            @viewOrder="viewOrderDetails"
            @updateStatus="updateOrderStatus($event)"
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
            @fetchMore="fetchDeliveredOrders"
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
            @fetchMore="fetchReturnedOrders"
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
            @fetchMore="fetchCompletedOrders"
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
            @fetchMore="fetchDeclinedOrders"
           >
           </declined-order-table>
         </app-table-wrapper>
       </template>
   </app-tab>

   <DriverList v-model:openModal="openDriverModal"/>
</template>

<script lang="ts" setup>
import { ref, computed} from "vue"
import { storeToRefs } from "pinia";
import { Pagination } from '@/types'
import { useRouter } from "vue-router";

import { formatDate, formatTime, formatAsMoney, formatText, capitalizeFirstLeters } from "@/utils";
// ============ Local Componeents ============//
import NewOrderTable from "./Tables/Orders/NewOrderTable.vue";
import DriverList from "./Modals/DriverList.vue";
import ReturnedOrderTable from "./Tables/Orders/ReturnedOrderTable.vue";
import DeliveredOrderTable from "./Tables/Orders/DeliveredOrderTable.vue";
import CompletedOrderTable from "./Tables/Orders/CompletedOrderTable.vue";
import DeclinedOrderTable from "./Tables/Orders/DeclinedOrderTable.vue";

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";
import AppTable from "@/components/AppTable.vue";
import TableFooter from '@/components/AppTableFooter.vue'
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { ROUTES } from "@/constants";
import { openToastNotification } from '@/utils'

import { useOrderStore } from "@/stores";

const orderStore = useOrderStore();
const { 
  new_orders, 
  delivered_orders, 
  returned_orders,
  declined_orders, 
  completed_orders,
} = storeToRefs(orderStore)

const router = useRouter()

const loading = ref(false)
const openDriverModal = ref(false)
const tabTitles = ref([ 
  "new orders", 
  "delivered orders",
  "orders returned", 
  "completed orders", 
  "declined orders"
])

const newOrdersTableData = computed(() => {
  return new_orders.value?.data?.map((elm:any)=>{    
    return {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": formatText(elm.payment_method),
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status.toLowerCase(),
    }
  })
})

const  deliveredOrderTableData = computed(() => {
  return delivered_orders.value?.data.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": formatText(elm.payment_method),
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status.toLowerCase(),
   }
  })
})

const declinedOrderTableData = computed(() => {
  return declined_orders.value?.data.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": formatText(elm.payment_method),
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status.toLowerCase(),
   }
  })
})

const completedOrderTableData = computed(() => {
  return completed_orders.value?.data.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": formatText(elm.payment_method),
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status.toLowerCase(),
   }
  })
})

const returnedOrderTableData = computed(() => {
  return returned_orders.value?.data.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": formatText(elm.payment_method),
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status.toLowerCase(),
   }
  })
})

const pagination = computed<Pagination>(() => {
 return {
   total: 0,
   currentPageTotal: 0,
   currentPageNo: 1,
   totalNoPages: 1
 }
});

const viewOrderDetails= (item: any) => {
  // this find method is temporal till i get and endpoint to get single order
  let data = new_orders.value.data.find((elm)=> elm.order_id === item.id ) 
  orderStore.updateOrderDetails(data);
  router.push({name: ROUTES.view_orders.name, params: { id: item.id }})
}

const fetchNewOrders = async(page: number) => {
  loading.value = true
  await orderStore.fetchNewOrders(`page=${page}`); 
  loading.value = false
}
const fetchDeliveredOrders = async(page: number) => {
  loading.value = true
  await orderStore.fetchDeliveredOrders(`page=${page}`); 
  loading.value = false
}
const fetchCompletedOrders = async(page: number) => {
  loading.value = true
  await orderStore.fetchCompletedOrders(`page=${page}`); 
  loading.value = false
}
const fetchReturnedOrders = async(page: number) => {
  loading.value = true
  await orderStore.fetchReturnedOrders(`page=${page}`); 
  loading.value = false
}
const fetchDeclinedOrders = async(page: number) => {
  loading.value = true
  await orderStore.fetchDeclinedOrders(`page=${page}`); 
  loading.value = false
}
const processStatusUpdate = (payload: any) => {

  if(payload.status.toLowerCase()  ===  "in_transit" &&  !payload.driverId ){
     openDriverModal.value = true
     return false
  }

  return true
}

const updateOrderStatus = async(payload: any) => {
  if(!processStatusUpdate(payload)) return
  loading.value = true
  const data = await orderStore.updateOrderStatus(payload); 
  if(data){
    openToastNotification({
      message: `Order has been updated successfully`,
      variant: 'success'
    });
  }
  loading.value = false
}
</script>
