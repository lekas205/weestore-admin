<template>
    <section class="pa-5">
        <StatCard />
        <app-tab :tabTitles="tabTitles" class="mt-5">
            <template #credit_requests>
                <CreditTable
                    :items="creditRequestData"
                    :loading="loading"
                    @showDetails="openModal = true"
                    class="elevation-1 custom-table"
                >
                </CreditTable>
            </template>

            <template #active_credits>
                <CreditTable
                    :items="creditRequestData"
                    :loading="loading"
                    class="elevation-1 custom-table"
                >
                </CreditTable>
            </template>

            <template #paid_credits>
                <CreditTable
                    :items="creditRequestData"
                    :loading="loading"
                    class="elevation-1 custom-table"
                >
                </CreditTable>
            </template>
        </app-tab>
        <LoanDetails :openModal="openModal" @close="openModal = false" />
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, markRaw,computed, onMounted } from "vue";

import StatCard from "./components/StatCard.vue";
import AppTab from '@/components/AppTab.vue';

import CreditTable from "./components/Tables/CreditTable.vue";
import LoanDetails from "./components/LoanDetails.vue";

import { useCreditStore, useAuthStore } from "@/stores";

const authStore = useAuthStore()
const creditStore = useCreditStore()

const { credit_request } = storeToRefs(creditStore)


const loading = ref(false);
const openModal = ref(false)
const tabTitles = markRaw([ "credit requests", "active credits", "paid credits"])

const creditRequestData = ref([
    {
        "name": "Ela John",
        "phone_no": "May 16 2024",
        "amount": "Nivea Roll on",
        "duration": 2000,
        "balance": 3000,
        "request_date": 2400,
        "next_payment": "BANK TRANSFER",
        "status": "Full Delivery",
    }
])

const pagination = computed(()=> credit_request.value?.pagination)

onMounted(async ()=>{
   await creditStore.fetchCreditRequest();
})
</script>
