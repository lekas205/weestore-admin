<template>
    <section class="tw-p-[30px]">
        <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn>
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
                        <v-btn color="green-200" @click="procceed('approve', item.id)"> Approve </v-btn>
                        <v-btn color="#F65901" @click="procceed('reject', item.id)"> Decline </v-btn>
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination"  @next="next($event)"/>
                </template>
            </v-data-table>
        </app-table-wrapper>
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

import StatCard from "./components/StatCard.vue";
import { useWalletStore, useAuthStore } from "@/stores";
import { formatText, formatAsMoney, openToastNotification } from "@/utils";

const walletStore = useWalletStore()
const authStore = useAuthStore()

const router = useRouter();

const { pending_requests } = storeToRefs(walletStore)

const page = ref(1);
const payload = ref({
    page: 1,
    search: ""
});
const loading = ref(false)
const headers = ref<any[]>([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Name',
    },
    { key: 'topup_type', title: 'Topup Type' },
    { key: 'amount', title: 'Topup Amount' },
    { key: 'payment_proof', title: 'View Proof Of  Payment' },
    { key: 'action', title: 'Action' },

])

const pagination = computed(()=> pending_requests.value?.pagination)
const items = computed<any[]>(()=> {
    return pending_requests.value?.data?.map((elm:any)=> {
        return {
            id: elm.request_id,
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            amount: formatAsMoney(elm.amount),
            phone_no: elm.phone,
            topup_type: elm.topup_type,
            payment_url: elm.paymentUrl
        }
    })
})

const view = (image_url: string) => {    
    window.open(image_url, "_blank");
}

const fetcheData = async (query?: any) => {
    loading.value = true
    await walletStore.fetchPendingRequest(query)
    loading.value = false
};

const procceed = async(action: string, requestId: string) => {
    loading.value = true;
    let res =  await  walletStore.approveDeclineRequest({
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
