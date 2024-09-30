<template>
  <section>
    <app-tab :tabTitles="tabTitles" class="mt-5">
       <!-- New Orders Table -->
       <template #new_orders>
          <new-order-table
           :loading="loading"
            :items="newOrdersTableData"
            :pagination="new_orders?.pagination"
            class="elevation-1 custom-table"
            @filter="fetchNewOrders($event)"
            @fetchMore="fetchNewOrders($event)"
            @updateStatus="updateOrderStatus($event)"
          >
          </new-order-table>
       </template>

       <!-- Delivered Orders Table -->
       <template #delivered_orders>
           <delivered-order-table
            :items="deliveredOrderTableData"
            :loading="loading"
            :pagination="delivered_orders?.pagination"
            @filter="fetchDeliveredOrders($event)"
            class="elevation-1 custom-table"
            @fetchMore="fetchDeliveredOrders"
            @updateStatus="updateOrderStatus($event)"
           >
           </delivered-order-table>
       </template>

      <!-- Order Returned Table -->
       <template #orders_returned>
           <returned-order-table
            :items="returnedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
            @fetchMore="fetchReturnedOrders"
            :pagination="returned_orders?.pagination"
            @filter="fetchReturnedOrders($event)"
           >
           </returned-order-table>
       </template>

        <!-- Completed Orders Table -->
        <template #completed_orders>
           <completed-order-table
            :items="completedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
            :pagination="completed_orders?.pagination"
            @fetchMore="fetchCompletedOrders"
            @filter="fetchCompletedOrders($event)"
           >
           </completed-order-table>
       </template>

        <!-- Declined Orders Table -->
        <template #declined_orders>
           <declined-order-table
            :items="declinedOrderTableData"
            :loading="loading"
            class="elevation-1 custom-table"
            @fetchMore="fetchDeclinedOrders"
            @filter="fetchDeclinedOrders($event)"
            :pagination="declined_orders?.pagination"
           >
           </declined-order-table>
       </template>
   </app-tab>
   <ConfirmCancelModal
      :openModal="openConfirmModal" 
      @close="openConfirmModal = false" 
      @proceed="proceedToDecline" 
      title="Are you sure you want to decline this order?"
   />
   <DriverList v-model:openModal="openDriverModal"  @procced="proceedToTransit($event)" />
  </section>
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
import TableFooter from '@/components/AppTableFooter.vue';
import ConfirmCancelModal from '@/components/AppConfirmModal.vue';


import { ROUTES, PAYMENT_METHOD } from "@/constants";
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

const loading = ref(false);
const openConfirmModal = ref(false);
const ouderToUpdate = ref<any>({})
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
      order_number: elm.order_no,
      date: `${formatDate(elm.created_data)}` ,
      reseller_name: capitalizeFirstLeters(elm.customer_name),
      warehouse: capitalizeFirstLeters(elm.warehouse_name),
      channel: PAYMENT_METHOD[elm.payment_method],
      amount: formatAsMoney(elm.amount) ,
      status: elm.status,
      payment_proof: elm.payment_proof,
    }
  })
})

const  deliveredOrderTableData = computed(() => {
  return delivered_orders.value?.data?.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.order_no,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": PAYMENT_METHOD[elm.payment_method],
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status,
      payment_proof: elm.payment_proof,
   }
  })
})

const declinedOrderTableData = computed(() => {
  return declined_orders.value?.data?.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.order_no,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": PAYMENT_METHOD[elm.payment_method],
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status,
      payment_proof: elm.payment_proof,
   }
  })
})

const completedOrderTableData = computed(() => {
  return completed_orders.value?.data?.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.order_no,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": PAYMENT_METHOD[elm.payment_method],
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status,
      payment_proof: elm.payment_proof,
   }
  })
})

const returnedOrderTableData = computed(() => {
  return returned_orders.value?.data?.map((elm:any)=> {
    return  {
      id: elm.order_id,
      "order_number": elm.customer_name,
      "date": `${formatDate(elm.created_data)}` ,
      "reseller_name": capitalizeFirstLeters(elm.customer_name),
      "warehouse": capitalizeFirstLeters(elm.warehouse_name),
      "channel": PAYMENT_METHOD[elm.payment_method],
      "amount": formatAsMoney(elm.amount) ,
      "status": elm.status,
      payment_proof: elm.payment_proof,
      is_return_processed: elm.is_return_processed,
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
  let data = new_orders.value.data.find((elm: any)=> elm.order_id === item.id ) 
  orderStore.updateOrderDetails(data);
  router.push({name: ROUTES.view_orders.name, params: { id: item.id }})
}

const fetchNewOrders = async(payload: any) => {
  loading.value = true
  await orderStore.fetchNewOrders(payload); 
  loading.value = false
}
const fetchDeliveredOrders = async(payload?:any) => {
  loading.value = true
  await orderStore.fetchDeliveredOrders(payload); 
  loading.value = false
}
const fetchCompletedOrders = async(payload: any) => {
  loading.value = true
  await orderStore.fetchCompletedOrders(payload); 
  loading.value = false
}
const fetchReturnedOrders = async(payload: any) => {
  loading.value = true
  await orderStore.fetchReturnedOrders(payload); 
  loading.value = false
}
const fetchDeclinedOrders = async(payload?: any) => {
  loading.value = true
  await orderStore.fetchDeclinedOrders(payload); 
  loading.value = false
}
const processStatusUpdate = (payload: any) => {
  if(payload.status.toLowerCase()  ===  "in_transit" &&  !payload.driverId ){
     openDriverModal.value = true
     ouderToUpdate.value  = payload
     return false
  }

  if(payload.status.toLowerCase()  ===  "declined" && !ouderToUpdate.value.status ){
    ouderToUpdate.value  = payload
    openConfirmModal.value = true
    return false
  }
  return true
}

const proceedToTransit = async(driverId: string) => {
  ouderToUpdate.value.driverId = driverId
  updateOrderStatus(ouderToUpdate.value)
}

const fetchContent = async () => {
  loading.value = true
  await  orderStore.fetchNewOrders()
  loading.value = false
}

const proceedToDecline = () => {
  openConfirmModal.value = false;
  updateOrderStatus(ouderToUpdate.value)
}

const updateOrderStatus = async(payload: any) => {
  if(!processStatusUpdate(payload)) return
  loading.value = true
  const data = await orderStore.updateOrderStatus(payload); 

  if(data){
    await fetchContent();
    openToastNotification({
      message: `Order has been updated successfully`,
      variant: 'success'
    });

    if(payload.status.toLowerCase() === "declined"){
      fetchDeclinedOrders()
    }
    if(payload.status.toLowerCase() === "return_order"){
      fetchDeliveredOrders()
    }
  }
 
  loading.value = false
  ouderToUpdate.value = {}
}
</script>
