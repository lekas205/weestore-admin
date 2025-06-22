<template>
    <section class="tw-p-[30px]">
        <app-table-wrapper 
            noExport
            class="tw-mt-[50px]" 
            searchLabelText="Search by Name,email,phone" 
            @search="search" 
            @filter="fetcheData($event)">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                :items-per-page="pagination?.currentPageTotal"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >

                <template v-slot:item.payment_proof="{ item }">
                    <ZoomIn class="cursor-pointer" @click="view(item.payment_url)"/>
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <v-btn color="green-200" @click="confirmPayment(item)" > Approve </v-btn>
                        <!-- procceed('approve', item.id) -->
                        <v-btn color="#F65901" @click="proceed('reject', item.id)"> Decline </v-btn>
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination"  @next="next($event)"/>
                </template>
            </v-data-table>
        </app-table-wrapper>

        <ConfrmWithdrawalModal :details="customerDetails" v-model:openModal="openModal" @proceed="proceed('approve', customerDetails?.id)"/>
    </section>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed , watch} from "vue";
import { storeToRefs } from "pinia";
import { ZoomIn } from 'lucide-vue-next'
import { useRouter } from "vue-router";
import { ChevronLeft } from 'lucide-vue-next'

import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { useWithdrawalStore, useAuthStore } from "@/stores";
import { formatText, formatAsMoney, openToastNotification } from "@/utils";
import ConfrmWithdrawalModal from "@/components/ConfrmWithdrawalModal.vue";

const withdrawalStore = useWithdrawalStore()
const authStore = useAuthStore()

const router = useRouter();

const { pending_requests } = storeToRefs(withdrawalStore)

const page = ref(1);
const payload = ref({
    page: 1,
    search: ""
});
const loading = ref(false)
const openModal = ref(false)
const headers = ref<any[]>([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Name',
    },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'amount', title: 'Topup Amount' },
    { key: 'payment_proof', title: 'View Proof Of  Payment' },
    { key: 'action', title: 'Action' },

])

const customerDetails = ref()

const pagination = computed(()=> pending_requests.value?.pagination)
const items = computed<any[]>(()=> {
    return pending_requests.value?.data?.map((elm:any)=> {
        return {
            id: elm.request_id,
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            amount: formatAsMoney(elm.amount),
            phone_no: elm.phone,
            payment_url: elm.paymentUrl
        }
    })
})


const confirmPayment = (customer: any) => {
    openModal.value = true;
    customerDetails.value = customer
}

const view = (image_url: string) => {    
    window.open(image_url, "_blank");
}

const fetcheData = async (query?: any) => {
    loading.value = true
    await withdrawalStore.fetchPendingRequest(query)    
    loading.value = false
};

const proceed = async(action: string, requestId: string) => {
    loading.value = true;
    let res =  await  withdrawalStore.approveDeclineRequest({
        action,
        id: requestId
    });

    if(res){
        await  fetcheData({page: page.value});
        openToastNotification({
            message: `Walet topup  request was ${action} successfully`,
            variant: 'success'
        });
    }

    loading.value = false
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;

    fetcheData(payload.value)
}

const next = (page: number) =>{
    payload.value.page = page;
    fetcheData(payload.value)
};

onMounted( async ()=> {
    authStore.toggleLoader();
    await  fetcheData({page: page.value})
    authStore.toggleLoader();
})
</script>
