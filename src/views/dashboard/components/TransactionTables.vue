<template>
     <app-tab :tabTitles="tabTitles" >
        <!-- Sales Tnflow Table -->
        <template #sales_inflow>
          <app-table-wrapper 
            tableName="salesInflow"
            searchLabelText="Search for client" 
            @export="fetchSalesInflow($event)"
            @filter="fetchSalesInflow($event)"
            @search="fetchSalesInflow({search: $event})"
          >
            <app-table
              :items="salesTableData"
              :loading="loading"
              class="elevation-1 custom-table"
            >
            </app-table>
          </app-table-wrapper>
        </template>

        <!-- Cash Tnflow Table -->
        <template #cash_inflow>
          <app-table-wrapper 
            tableName="cashFlow"
            searchLabelText="Search for client"  
            @export="fetchCashInflow($event)"
            @filter="fetchCashInflow($event)"
            @search="fetchCashInflow({search: $event})"
          >
            <app-table
              :items="cashInflowTableData"
              :loading="loading"
              class="elevation-1 custom-table"
            >
            </app-table>
          </app-table-wrapper>
        </template>

         <!-- Cash Outflow Table -->
        <template #cash_outflow>
          <app-table-wrapper 
            tableName="cashFlow"
            searchLabelText="Search for client"
            @export="fetchCashOutflow($event)"
            @filter="fetchCashOutflow($event)"
            @search="fetchCashOutflow({search: $event})"
          >
            <app-table
              :items="cashOutflowTableData"
              :loading="loading"
              class="elevation-1 custom-table"
            >
            </app-table>
          </app-table-wrapper>
        </template>
    </app-tab>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted} from "vue"
import {storeToRefs } from "pinia";
import { Pagination } from '@/types'

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";
import AppTable from "@/components/AppTable.vue";
import TableFooter from '@/components/AppTableFooter.vue'
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { useDashboardStore } from "@/stores";
import { PAYMENT_METHOD } from "@/constants";
import { formatText, formatAsMoney } from "@/utils";

const dashboadStore = useDashboardStore();

const { sales_inflow, cash_inflow, cash_outflow, dashboardStats } = storeToRefs(dashboadStore);


const loading = ref(false);
const tabTitles = ref([ "sales inflow", "cash inflow", "cash outflow"])

const salesTableData = computed<any[]>(() => {
  return sales_inflow.value.data.map((elm:any)=>{
    return {
        "Reswller Name": elm.resellerName,
        "Number": elm.phone,
        "Order Amount": formatAsMoney(elm.orderAmount),
        "Amount Paid": formatAsMoney(elm.amountPaid),
        "Channel": PAYMENT_METHOD[elm.channel],
        "Order ID": elm.orderNo,
        "Date": elm.date,
        "Status": elm.status,
    }
  })
 
});

const cashInflowTableData = computed<any[]>(() => {
  return cash_inflow.value.data.map((elm:any)=>{
    return {
        "Reseller Name": elm.resellerName,
        "Number": elm.phone,
        // "Product": "Nivea Roll on",
        "Amount": formatAsMoney(elm.amount),
        "Payment Channel": PAYMENT_METHOD[elm.paymentChannel],
        "Reference": elm.reference,
        "Date": elm.date,
    }
  })
})

const cashOutflowTableData = computed<any[]>(() => {
  return cash_outflow.value.data.map((elm:any)=>{
    return {
        "Reseller Name": elm.resellerName,
        "Number": elm.phone,
        // "Product": "Nivea Roll on",
        "Amount": formatAsMoney(elm.amount),
        "Payment Channel": PAYMENT_METHOD[elm.paymentChannel],
        "Reference": elm.reference,
        "Date": elm.date,
    }
  })
})


const pagination = computed<Pagination>(() => {
  return {
    total: 0,
    currentPageTotal: 0,
    currentPageNo: 1,
    totalNoPages: 1
  }
});

const fetchSalesInflow = async (query?:any) => {
  loading.value = true;
  await dashboadStore.fetchSalesInflow(query);
  loading.value = false;
};

const fetchCashInflow = async (query?:any) => {
  loading.value = true;
  await dashboadStore.fetchCashInflow(query);
  loading.value = false;
};

const fetchCashOutflow = async (query?:any) => {
  loading.value = true;
  await dashboadStore.fetchCashOutflow(query);
  loading.value = false;
};



onMounted(async () => {
  await Promise.all([
    fetchSalesInflow(),
    fetchCashInflow(),
    fetchCashOutflow(),
  ]);
})
</script>
