<template>
    <section class="tw-p-[30px]">
        <!-- <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn> -->
        <stat-card />
        <app-table-wrapper searchLabelText="Search by Name,email,phone" class="tw-mt-[50px]">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >
                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination"  v-model:page="page"/>
                </template>
            </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed , watch} from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ChevronLeft } from 'lucide-vue-next'

import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import { useCustomersStore, useAuthStore } from "@/stores";
import StatCard from "./components/StatCard.vue";
import { formatText } from "@/utils";


const router = useRouter()
const authStore = useAuthStore()
const customerStore = useCustomersStore()

const { customers } = storeToRefs(customerStore)

const page = ref(1)
const headers = ref<any[]>([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Name',
    },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'amount', title: 'Amount In Account' },
])

const pagination = computed(()=> customers.value?.pagination)
const items = computed(() => {
    return customers.value?.data?.map((elm: any)=> {
        return  {
            id: elm.customer_id,
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            phone_no: elm.phone,
        }
    })
})


const fetchCustomer = async (query:any)=>{
    await  customerStore.fetchCustomers(query)
}


watch(()=> page.value, (newPage)=>{
if(newPage)  fetchCustomer({page: newPage})
})

onMounted(async ()=>{
    authStore.toggleLoader();
    await fetchCustomer({page: page.value})
    authStore.toggleLoader();
})
</script>
