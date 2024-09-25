<template>
    <section class="mt-5 tw-p-5">
        <stat-card :stats="dashboardStats" />
        <transaction-tab />
    </section>
</template>

<script lang="ts" setup>
    import { onMounted } from "vue";
    import { storeToRefs } from "pinia";
    import StatCard from "./components/StatCard.vue";
    import TransactionTab from "./components/TransactionTab.vue";

    import { useOrderStore , useAuthStore} from "@/stores";

    const orderStore = useOrderStore();
    const authStore = useAuthStore();
    const { dashboardStats } = storeToRefs(orderStore)

    onMounted( async ()=>{
        try{
            authStore.toggleLoader();
            await Promise.all([
                orderStore.fetchNewOrders(), 
                orderStore.fetchCompletedOrders(),
                orderStore.fetchDeliveredOrders() ,
                orderStore.fetchReturnedOrders(),
                orderStore.fetchDeclinedOrders(),
                orderStore.getDashboardStats(), 
            ])     
            authStore.toggleLoader();        
        }catch(err:any){
            console.log(err);
        }
    })

</script>
