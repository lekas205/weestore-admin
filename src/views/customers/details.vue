<template>
    <div class="pa-5">
        <div class="tw-flex">
            <h2 class="tw-text-[32px] tw-font-bold tw-mr-auto"> {{ customer.name }}  </h2>
            <v-btn color="primary"> Edit </v-btn>

            <div class="tw-bg-[#FF0F00AD] tw-text-white pa-4 tw-w-[300px] tw-ml-[40px] rounded-lg">
                <h4 class="tw-text-[24px] tw-underline" >Bank Details</h4>
                <div class="tw-flex tw-justify-between mb-2">
                    <p class="tw-text-[20px]">Bank Name</p>
                    <p class="tw-text-[20px]"> {{customer.bankDetails.bank_name }} </p>
                </div>
                <div class="tw-flex tw-justify-between mb-2"> 
                    <p class="tw-text-[20px]">Acct Name</p>
                    <p class="tw-text-[20px]"> {{ customer.bankDetails.acct_name }} </p>
                </div>
                <div class="tw-flex tw-justify-between">
                    <p class="tw-text-[20px]">Acct Number</p>
                    <p class="tw-text-[20px]"> {{ customer.bankDetails.acct_no }} </p>
                </div>
            </div>
        </div>

        <!-- customer personal data -->

        <v-row :gutter="4" class="mt-5">
            <v-col col="6" :md="3">
                <p>FULL NAME</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ customer.name }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>EMAIL ADDRESS</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ customer.email }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>PHONE NUMBER</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ customer.phone_no }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>CASH POINTS</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ customer.phone_no }}
                </div>
            </v-col>
        </v-row>

        <v-row :gutter="4" class="mt-5">
            <v-col col="6" :md="3">
                <p>CREDIT WALLET</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>TOTAL PURCHASE</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>TOTAL RETURNS</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>MY ACCOUNT</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                </div>
            </v-col>
        </v-row>

        <!-- Customer Transaction History -->
        <app-tab :tabTitles="tabTitles" class="tw-mt-[50px]">
            <template #order_history>
                <OrderHistoryTable :loading="loading" :items="orderhistoryData" />
            </template>
            <template #transaction_history>
                <TransactionHistory :loading="loading" :items="transactionistoryData" />
            </template>
        </app-tab>
    </div>
</template>

<script lang="ts" setup>
import { ref, markRaw } from "vue";
import AppTab from "@/components/AppTab.vue";
import OrderHistoryTable from "./components/OrderHistoryTable.vue";
import TransactionHistory from "./components/TransactionHistory.vue";

const tabTitles =markRaw(["order history", "transaction history"])
const customer = ref({
    name: "Wale Benson",
    phone_no: "0909876534",
    email: "walebenson@gmail.com",
    bankDetails: {
        acct_name: "walle",
        bank_name: "UBA",
        acct_no: "0748387732"
    }
})

const orderhistoryData = ref([
    {
        order_no: "1234",
        date: "May 16 2024 9:23 AM",
        method: "transfer",
        amount: "3000",
        status: "delivered"
    }
])

const transactionistoryData = ref([
    {
        purpose: "Account Topup",
        date: "May 16 2024 9:23 AM",
        method: "Transfer",
        amount: "3000",
        position: "Debit"
    }
])
</script>
