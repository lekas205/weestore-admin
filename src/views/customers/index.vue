<template>
    <section class="px-4 py-5">
        <StatCard />
        <app-table-wrapper searchLabelText="Search by Name,email,phone" class="tw-mt-[50px]"  @search="search">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <ZoomIn @click="router.push('/customers/'+item.id)" />
                        <Trash2 />
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination" v-model:page="page" />
                </template>
            </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref , watch} from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Trash2, ZoomIn } from 'lucide-vue-next'

import StatCard from "./components/StatCard.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import { useCustomersStore, useAuthStore } from "@/stores";
import { formatDate, formatText } from "@/utils";


const router = useRouter();
const authStore = useAuthStore()
const customerStore = useCustomersStore()

const { customers } = storeToRefs(customerStore)

const page = ref(1)
const loading = ref(false);
const payload = ref({
    page: 1,
    search: ""
});

const headers = ref<any[]>([
    // {
    //     align: 'start',
    //     key: 'id',
    //     sortable: false,
    //     title: 'ID',
    // },
    { key: 'date', title: 'Joining Date' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'platform', title: 'How do you hear about us' },
    { key: 'action', title: 'Action' },
])

const pagination = computed<any>(()=> customers.value?.pagination)
const items = computed<any[]>(() => {
    return customers.value?.data?.map((elm: any)=> {
        return  {
            id: elm.customer_id,
            date: formatDate(elm.registration_date),
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            email: elm.email,
            phone_no: elm.phone,
            platform: elm.platform ?? "--",
        }
    })
})

const fetchCustomer = async (query:any)=>{
    loading.value = true
    await  customerStore.fetchCustomers(query)
    loading.value = false
}

watch(()=> page.value, (newPage)=>{
    if(newPage) {
        payload.value.page = newPage;
        fetchCustomer(payload.value)
    } 
})

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;

    fetchCustomer(payload.value)
}

onMounted( async()=>{
    authStore.toggleLoader();
    await fetchCustomer({page: page.value})
    authStore.toggleLoader();
})
</script>
