<template>
    <section class="tw-p-[30px]">
        <!-- <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn> -->
        <stat-card :stats="dashboardStats" />
        <app-table-wrapper 
            tableName="wallet"
            searchLabelText="Search by Name,email,phone" 
            class="tw-mt-[50px]" 
            createBtnText="Topup"
            @search="search" 
            @create="showTopup = true"
            @export="fetchCustomer($event)"
            @filter="fetchCustomer($event)"
        >
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                :items-per-page="pagination?.currentPageTotal"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >

                <template v-slot:item.name="{ item }">
                    <p @click="router.push('/customers/'+item.id)"  class=" tw-underline tw-cursor-pointer" >  {{item.name }}</p>
                </template>
                <template v-slot:item.amount="{ item }">
                    <p> {{ formatAsMoney(item?.wallet?.balance) }} </p>
                </template>
                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination"  @next="next($event)"/>
                </template>
            </v-data-table>
        </app-table-wrapper>

        <TopupModal :openModal="showTopup" @close="showTopup = false" />
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed , watch} from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
// import { ChevronLeft } from 'lucide-vue-next'

import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import { useCustomersStore, useAuthStore, useWalletStore } from "@/stores";
import StatCard from "./components/StatCard.vue";
import { formatText, formatAsMoney } from "@/utils";
import TopupModal from "./components/TopupModal.vue";


const router = useRouter()
const authStore = useAuthStore()
const walletStore = useWalletStore()
const customerStore = useCustomersStore()

const { customers } = storeToRefs(customerStore);
const { dashboardStats } = storeToRefs(walletStore);

const page = ref(1)
const payload = ref({
    page: 1,
    search: ""
});

const showTopup = ref(false)
const loading = ref<boolean>(false)
const headers = ref<any[]>([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Name',
    },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'pocket', title: 'Amount In Pocket' },
    { key: 'rewards', title: 'Amount In Rewards' },
])

const pagination = computed(()=> customers.value?.pagination)
const items = computed<any[]>(() => {
    return customers.value?.data?.map((elm: any)=> {
        return  {
            id: elm.customer_id,
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            phone_no: elm.phone,
            rewards: formatAsMoney(elm.wallets.find((x: any)=> x.wallet_type === "REWARD")?.balance || 0),
            pocket: formatAsMoney(elm.wallets.find((x: any)=> x.wallet_type === "POCKET")?.balance || 0),
        }
    })
})


const fetchCustomer = async (query:any)=>{
    loading.value = true
    await  customerStore.fetchCustomers(query)
    loading.value = false
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;

    fetchCustomer(payload.value)
}


const next = (page: number) =>{
    payload.value.page = page;
    fetchCustomer(payload.value)
};

onMounted(async ()=>{
    if(customers.value.data.length && dashboardStats.value.pendingTopUpApproval) return
    authStore.toggleLoader();
    await Promise.all([
     fetchCustomer({page: page.value}),
     walletStore.getDashboardStats()
    ])
    authStore.toggleLoader();
})
</script>
