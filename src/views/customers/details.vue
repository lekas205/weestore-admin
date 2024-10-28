<template>
    <div class="pa-5">
        <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn>
        <div class="tw-flex mt-3">
            <h2 class="tw-text-[32px] tw-font-bold tw-mr-auto"> {{ formatText(customer.first_name) }} {{ formatText(customer.last_name) }}  </h2>
            <v-btn color="primary" @click="showEditCustomerModal = true"> Edit </v-btn>

            <!-- <div class="tw-bg-[#FF0F00AD] tw-text-white pa-4 tw-w-[300px] tw-ml-[40px] rounded-lg">
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
            </div> -->
        </div>

        <!-- customer personal data -->

        <v-row :gutter="4" class="mt-5">
            <v-col col="6" :md="3">
                <p>FULL NAME</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ `${ formatText(customer.first_name)} ${formatText(customer.last_name)} `}}
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
                    {{ customer.phone }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>CASH POINTS</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ formatAsMoney(customer.cashpoint) }}
                </div>
            </v-col>
        </v-row>

        <v-row :gutter="4" class="mt-5">
            <!-- <v-col col="6" :md="3">
                <p>CREDIT WALLET</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ formatAsMoney(customer.credit_wallet) }}
                </div>
            </v-col> -->
            <v-col col="6" :md="3">
                <p>WAREHOUSE</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ customer.warehouse }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>MY ACCOUNT</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ formatAsMoney(customer.account) }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>TOTAL REFUNDS</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ formatAsMoney(customer.total_refunds) }}
                </div>
            </v-col>
            <v-col col="6" :md="3">
                <p>TOTAL INVOICES</p>
                <div class="tw-bg-[#DFE0E0] py-4 px-3 tw-rounded-lg tw-h-[55px]">
                    {{ formatAsMoney(customer.total_invoice, false ) }}
                </div>
            </v-col>
        </v-row>

        <!-- Customer Transaction History -->
        <app-tab :tabTitles="tabTitles" class="tw-mt-[50px]">
            <template #order_history>
                <OrderHistoryTable 
                    :loading="loading"
                    :items="orderhistoryData"
                    :pagination="customerOrders?.pagination"
                    @next="getCustomerOrders($event)"
                />
            </template>
            <template #transaction_history>
                <TransactionHistory 
                    :loading="loading"
                    :items="transactionistoryData"
                    :pagination="customerTransactions?.pagination"
                    @next="getCustomerTransactions($event)"
                />
            </template>
        </app-tab>

        <EditCustomerModal 
            :details="customer" 
            :openModal="showEditCustomerModal" 
            @close="showEditCustomerModal = false" 
        />
    </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { ChevronLeft } from 'lucide-vue-next'
import { ref, markRaw, onMounted, computed } from "vue";

import AppTab from "@/components/AppTab.vue";
import OrderHistoryTable from "./components/OrderHistoryTable.vue";
import TransactionHistory from "./components/TransactionHistory.vue";
import EditCustomerModal from "./components/EditCustomerModal.vue";

import { PAYMENT_METHOD } from "@/constants/common";
import { useCustomersStore, useAuthStore } from "@/stores";
import { formatDate, formatText, formatAsMoney } from "@/utils";

const route = useRoute();
const authStore = useAuthStore()
const customerStore = useCustomersStore()

const { custommerDetails: customer, customerOrders, customerTransactions }:any = storeToRefs(customerStore)

const loading = ref(false);
const showEditCustomerModal = ref(false);
const tabTitles =markRaw(["order history", "transaction history"]);

const customerId = computed<string>(()=> route.params.id as string);
const orderhistoryData = computed(()=> {
    return customerOrders.value.data?.map((elm:any)=> {
        return   {
            order_number: elm.order_no ?? "--",
            date:  formatDate(elm.date),
            method: PAYMENT_METHOD[elm.method],
            amount: formatAsMoney(elm.amount),
            status: elm.status,
        }
    })
});

const transactionistoryData = computed<any>(()=> {
    return customerTransactions.value.data?.map((elm:any)=> {
        return   {
            order_no: elm.order_no ?? "--",
            date:  elm.date,
            method: PAYMENT_METHOD[elm.payment_by],
            amount: formatAsMoney(elm.amount),
            position: elm.position,
            purpose: elm.purpose
        }
    })
});

const getCustomerOrders = async (query?: any) => {
    loading.value = true;
    await customerStore.getCustomerOrders({customerId: customerId.value, query}),
    loading.value = false;
}

const getCustomerTransactions = async (query?: any) => {
    loading.value = true;
    await customerStore.getCustomerTransactions({customerId: customerId.value, query })
    loading.value = false;
}


const getCustomer = async () => {
    authStore.toggleLoader();
    await Promise.all([
        customerStore.getSingleCustomer(customerId.value),
        customerStore.getCustomerOrders({customerId: customerId.value}),
        customerStore.getCustomerTransactions({customerId: customerId.value})
    ])
    authStore.toggleLoader();
}

onMounted(async ()=>{
    getCustomer()
})
</script>
