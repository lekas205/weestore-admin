<template>
    <section class="mt-5 tw-p-5">
        <app-tab :tabTitles="tabTitles" class="mt-5">
            <template #in_transit> 
                <ShipmentTable
                    action
                    :loading="loading"
                    :items="newOrdersTableData"
                    class="elevation-1 custom-table"
                    @filter="fetchInTransitOrders($event)"
                    @export="fetchInTransitOrders($event)"
                    @fetchMore="fetchInTransitOrders($event)"
                    @updateStatus="updateOrderStatus($event)"
                    :pagination="in_transit_orders?.pagination"
                />
            </template>

            <template #completed> 
                <ShipmentTable
                    :loading="loading"
                    :items="completedOrdersData"
                    class="elevation-1 custom-table"
                    @filter="fetchCompletedOrders($event)"
                    @export="fetchCompletedOrders($event)"
                    @fetchMore="fetchCompletedOrders($event)"
                    :pagination="completed_orders?.pagination"
                />
            </template>

            <template #declined> 
                <ShipmentTable
                    :loading="loading"
                    :items="declinedOrdersData"
                    class="elevation-1 custom-table"
                    @export="fetchDeclinedOrders($event)"
                    @filter="fetchDeclinedOrders($event)"
                    @fetchMore="fetchDeclinedOrders($event)"
                    :pagination="declined_orders?.pagination"
                />
            </template>
        </app-tab>

        <ConfirmCancelModal
            :openModal="openConfirmModal" 
            @close="openConfirmModal = false" 
            @proceed="proceedToDecline" 
            title="Are you sure you want to return this order?"
        />
    </section>
</template>

<script lang="ts" setup>
    import { onMounted, ref, computed } from "vue";
    import { storeToRefs } from "pinia";

    import AppTab from "@/components/AppTab.vue";
    import ConfirmCancelModal from '@/components/AppConfirmModal.vue';

    import ShipmentTable from "./components/ShipmentTable.vue";
    import { formatText, formatAsMoney, openToastNotification } from "@/utils";
    import { PAYMENT_METHOD } from "@/constants";

    import { useDriverStore , useAuthStore} from "@/stores";

    const driverStore = useDriverStore();
    const authStore = useAuthStore();
    const { declined_orders, in_transit_orders, completed_orders } = storeToRefs(driverStore);

    const loading = ref(false);
    const ouderToUpdate = ref<any>({})
    const openConfirmModal = ref(false)
    const tabTitles = ref([ 
        "In Transit", 
        "Completed",
        "Declined",
    ])

    const newOrdersTableData = computed(() => {
        return in_transit_orders.value?.data?.map((elm:any)=>{    
            return {
            id: elm.order_id,
            order_number: elm.order_no,
            date: `${elm.created_at}` ,
            customer_name: elm.customer_name,
            driver: elm.driver_name,
            channel: PAYMENT_METHOD[elm.payment_method],
            amount: formatAsMoney(elm.amountv || 0) ,
            status: 'IN_TRANSIT',
            payment_proof: elm.payment_proof,
            }
        })
    })

    const completedOrdersData = computed(() => {
        return completed_orders.value?.data?.map((elm:any)=>{    
            return {
            id: elm.order_id,
            order_number: elm.order_no,
            date: `${elm.created_at}` ,
            customer_name: elm.customer_name,
            driver: elm.driver_name,
            channel: PAYMENT_METHOD[elm.payment_method],
            amount: formatAsMoney(elm.amountv || 0) ,
            status: 'COMPLETED',
            payment_proof: elm.payment_proof,
            }
        })
    })


    const declinedOrdersData = computed(() => {
        return declined_orders.value?.data?.map((elm:any)=>{    
            return {
            id: elm.order_id,
            order_number: elm.order_no,
            date: `${elm.created_at}` ,
            customer_name: elm.customer_name,
            driver: elm.driver_name,
            channel: PAYMENT_METHOD[elm.payment_method],
            amount: formatAsMoney(elm.amountv || 0) ,
            status: 'DECLINED',
            payment_proof: elm.payment_proof,
            }
        })
    })

    const fetchInTransitOrders = async (query?:any) => {
        loading.value = true
        await  driverStore.fetchInTransitOrders(query);
        loading.value = false
    }

    const fetchCompletedOrders = async (query?:any) => {
        loading.value = true
        await driverStore.fetchCompletedOrders(query);
        loading.value = false
    }

    const fetchDeclinedOrders = async (query?:any) => {
        loading.value = true
        await driverStore.fetchDeclinedOrders(query);
        loading.value = false
    }

    const proceedToDecline = () => {
        openConfirmModal.value = false;
        updateOrderStatus(ouderToUpdate.value)
    }

    const processStatusUpdate = (payload: any) => {
        if(payload.status.toLowerCase()  ===  "package_rejected" && !ouderToUpdate.value.status ){
            ouderToUpdate.value  = payload
            openConfirmModal.value = true
            return false
        }
        return true
    }

    const updateOrderStatus = async(payload: any) => {
        if(!processStatusUpdate(payload)) return
        loading.value = true;
        console.log(payload);
        
        const data = await driverStore.updateOrderStatus(payload); 

        if(data){
            await fetchInTransitOrders()
            openToastNotification({
                message: `Order has been updated successfully`,
                variant: 'success'
            });

            if(payload.status.toLowerCase() === "completed"){
                fetchCompletedOrders()
            }
            if(payload.status.toLowerCase() === "package_rejected"){
                fetchDeclinedOrders()
            }
        }
        
        loading.value = false
        ouderToUpdate.value = {}
    }

    onMounted( async () => {
        try{
            if(in_transit_orders.value.data.length) return
            authStore.toggleLoader();
            await Promise.all([
                fetchInTransitOrders(),
                fetchCompletedOrders(),
                fetchDeclinedOrders(),
            ])     
            authStore.toggleLoader();        
        }catch(err:any){
            console.log(err);
        }
    })

</script>
