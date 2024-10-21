<template>
    <section class="tw-p-[30px]">
        <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn>

        <app-table-wrapper 
            noExport
            class="tw-mt-[50px]" 
            searchLabelText="Search by Name,email,phone" 
            @search="search" 
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

                <template v-slot:item.status="{ item }">
                    <p class="text-primary text-capitalize"> Unverified </p>
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <v-btn color="primary" @click="verify(item.id)"> Verify </v-btn>
                        <v-btn color="primary"> Delete </v-btn>
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination" @next="next($event)" />
                </template>
            </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed , watch} from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { ChevronLeft } from 'lucide-vue-next'

import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import { useCustomersStore, useAuthStore } from "@/stores";
import { formatDate, formatText, formatAsMoney , openToastNotification} from "@/utils";

const authStore = useAuthStore()
const customerStore = useCustomersStore()

const { unverifiedCustomers: customer } = storeToRefs(customerStore)

const router = useRouter()

const page = ref(1);
const loading = ref(false);
const payload = ref({
    page: 1,
    search: ""
});

const headers = ref<any[]>([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Fullname',
    },
    { key: 'email', title: 'Email' },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'status', title: 'Status' },
    { key: 'action', title: 'Action' },
])

const items = computed<any[]>(()=> {
    return customer.value?.data?.map((elm: any)=>{
    return {
        id: elm.customer_id,
        date: formatDate(elm.registration_date),
        name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
        email: elm.email,
        phone_no: elm.phone,
    }
   })
})

const pagination = computed<any>(()=> customer.value?.pagination)

const fetchCustomer = async (query:any)=>{
    loading.value = true
    await  customerStore.getUnverifiedCustomer(query)
    loading.value = false
}

const next = (page: number) =>{
    payload.value.page = page;
    fetchCustomer(payload.value)
};

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;

    fetchCustomer(payload.value)
}

const verify = async(id: string) => {
    authStore.toggleLoader();
   await customerStore.verifyCustomer(id)
   await fetchCustomer({page: page.value})
   authStore.toggleLoader();

   openToastNotification({
      message: `Customer has been verified successfully`,
      variant: 'success'
    });
}

onMounted(async ()=>{
    authStore.toggleLoader();
    await fetchCustomer(payload.value)
    authStore.toggleLoader();
})
</script>
