<template>
    <section class="tw-p-[30px]">
        <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn>
        <app-table-wrapper searchLabelText="Search by Name,email,phone" class="tw-mt-[50px]">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >

                <template v-slot:item.payment_proof="{ item }">
                    <ZoomIn class="cursor-pointer" />
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <v-btn color="green-200" @click="procceed('approve', item.id)"> Approve </v-btn>
                        <v-btn color="#F65901" @click="procceed('reject', item.id)"> Decline </v-btn>
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination" v-model:page="page"/>
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
const loading = ref(false)
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

const pagination = computed(()=> pending_requests.value?.pagination)
const items = computed<any[]>(()=> {
    return pending_requests.value?.data?.map((elm:any)=> {
        return {
            id: elm.request_id,
            name: `${formatText(elm.customer.first_name)} ${formatText(elm.customer.last_name)}`,
            amount: formatAsMoney(elm.amount),
            phone_no: elm.customer.phone,
        }
    })
})

const fetcheData = async (query?: any) => {
    await walletStore.fetchPendingRequest(query)
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


watch(()=> page.value, (newPage)=>{
    if(newPage)  fetcheData({page: newPage})
})

onMounted( async ()=> {
    authStore.toggleLoader();
    await  fetcheData({page: page.value})
    authStore.toggleLoader();
})
</script>
