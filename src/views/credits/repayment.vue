<template>
    <section class="tw-p-[30px]">
        <v-btn color="black" @click="$router.back()"> <ChevronLeft/> Back </v-btn>
        <app-table-wrapper searchLabelText="Search by Name" class="tw-mt-[50px]" @search="search" @filter="fetcheData($event)">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
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
                    <!-- <TableFooter v-bind="pagination"  @next="next($event)"/> -->
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
import { useCreditStore, useAuthStore } from "@/stores";
import { formatText, formatAsMoney, openToastNotification } from "@/utils";

const creditStore = useCreditStore()
const authStore = useAuthStore()

const router = useRouter();

const { repayment_request } = storeToRefs(creditStore)

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
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'amount', title: 'Topup Amount' },
    { key: 'payment_proof', title: 'View Proof Of  Payment' },
    { key: 'action', title: 'Action' },

])

const pagination = computed(()=> repayment_request.value?.pagination)
const items = computed<any[]>(()=> {
    return repayment_request.value?.data?.map((elm:any)=> {
        return {
            id: elm.request_id,
            name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
            amount: formatAsMoney(elm.amount),
            phone_no: elm.phone,
            payment_url: elm.paymentUrl
        }
    })
})

const view = (image_url: string) => {    
    window.open(image_url, "_blank");
}

const fetcheData = async (query?: any) => {
    loading.value = true
    await creditStore.fetchRepaymentRequests(query)
    loading.value = false
};

const procceed = async(action: string, requestId: string) => {
    loading.value = true;
    let res =  await  creditStore.approveDeclineRepaymentRequest({
        action,
        id: requestId
    });

    if(res){
        await  fetcheData({page: page.value});
        openToastNotification({
            message: `Laon repayment request was ${action  === 'approve' ? 'approved' : 'declined'} successfully`,
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
