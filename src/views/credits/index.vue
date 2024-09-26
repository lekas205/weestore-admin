<template>
    <section class="pa-5">
        <StatCard :stats="dashboardStats" />
        <app-tab :tabTitles="tabTitles" class="mt-5">
            <template #credit_requests>
                <CreditTable
                    :items="creditRequestData"
                    :loading="loading"
                    @showDetails="proceed($event)"
                    class="elevation-1 custom-table"
                    @filter="fetchPendingRequest($event)"
                    @fetchMore="fetchPendingRequest($event)"
                >
                </CreditTable>
            </template>

            <template #active_credits>
                <CreditTable
                    :items="approveRequestData"
                    :loading="loading"
                    class="elevation-1 custom-table"
                    @showDetails="proceed($event)"
                >
                </CreditTable>
            </template>

            <template #paid_credits>
                <CreditTable
                    :items="paidRequestData"
                    :loading="loading"
                    class="elevation-1 custom-table"
                >
                </CreditTable>
            </template>
        </app-tab>
        <LoanDetails :openModal="openModal" :loading="loading" :loanDetails="loanDeetails" @action="approveDeclineLoan($event)" @close="openModal = false" />
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, markRaw,computed, onMounted } from "vue";

import StatCard from "./components/StatCard.vue";
import AppTab from '@/components/AppTab.vue';

import CreditTable from "./components/Tables/CreditTable.vue";
import LoanDetails from "./components/LoanDetails.vue";

import { formatAsMoney, openToastNotification } from "@/utils";
import { LOAN_STATUSES } from "@/constants";
import { useCreditStore, useAuthStore } from "@/stores";

const authStore = useAuthStore()
const creditStore = useCreditStore()

const { paid_request, credit_request, approved_request, dashboardStats } = storeToRefs(creditStore)


const loading = ref(false);
const openModal = ref(false);
const loanDeetails = ref({});
const tabTitles = markRaw([ "credit requests", "active credits", "paid credits"])

const proceed = (item: any) => {    
    loanDeetails.value = item;
    openModal.value = true
}
 
const approveDeclineLoan = async (query: any) => {
    loading.value = true;
    const res = await creditStore.approveDeclineRequest(query);

    if(res){
        await creditStore.fetchCreditRequest(),
        openToastNotification({
          message:  `Loan request has been ${query.action === 'approve' ? 'approved': 'declined'}`,
          variant: 'success'
        });

        if(query.action === 'approve'){
            creditStore.fetchApprovedRequest()
        }else{
            creditStore.fetchPaidRequest()
        }

        loading.value = false
        openModal.value = false
    }

}

const creditRequestData = computed<any[]>(()=>{
    return credit_request.value.data.map((elm:any)=> {
        return  {
            id: elm.request_id,
            name: elm.first_name + " "+ elm.last_name,
            phone_no: elm.phone ,
            amount: formatAsMoney(elm.amount),
            duration: elm.duration,
            balance: formatAsMoney(elm.balance),
            request_date: elm.created_at,
            next_payment: elm.payment_date,
            warehouse: elm.warehouse,
            status: LOAN_STATUSES[elm.status],
            weekly_repayment: formatAsMoney(elm.expected_weekly_payment)
        }
    })
})

const approveRequestData = computed<any[]>(()=>{
    return approved_request.value.data.map((elm:any)=> {
        return  {
            id: elm.request_id,
            name: elm.first_name + " "+ elm.last_name,
            phone_no: elm.phone ,
            amount: formatAsMoney(elm.amount),
            duration: elm.duration,
            balance: formatAsMoney(elm.balance),
            request_date: elm.created_at,
            next_payment: elm.payment_date,
            warehouse: elm.warehouse,
            status: LOAN_STATUSES[elm.status],
            amount_paid: formatAsMoney(elm.amount_paid),
            amount_left: formatAsMoney(elm.amount_left),
            weekly_repayment: formatAsMoney(elm.expected_weekly_payment)
        }
    })
})

const paidRequestData = computed<any[]>(()=>{
    return paid_request.value.data.map((elm:any)=> {
        return  {
            id: elm.request_id,
            name: elm.first_name + " "+ elm.last_name,
            phone_no: elm.phone ,
            amount: formatAsMoney(elm.amount),
            duration: elm.duration,
            balance: formatAsMoney(elm.balance),
            request_date: elm.created_at,
            next_payment: elm.payment_date,
            warehouse: elm.warehouse,
            status: LOAN_STATUSES[elm.status]
        }
    })
})

const pagination = computed(()=> credit_request.value?.pagination)

const fetchPendingRequest = async (query: any) => {
   await creditStore.fetchCreditRequest(query)
};

const fetchApprvedRequest = async (query: any) => {
   await creditStore.fetchApprovedRequest(query)
};

const fetchPaidRequest = async (query: any) => {
   await creditStore.fetchPaidRequest(query)
};
onMounted(async ()=>{
    authStore.toggleLoader();
    await Promise.all([
        creditStore.fetchCreditRequest(),
        creditStore.fetchApprovedRequest(),
        creditStore.fetchPaidRequest(),
        creditStore.getDashboardStats()
    ])
    authStore.toggleLoader();
})
</script>
