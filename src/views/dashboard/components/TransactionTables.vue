<template>
     <app-tab :tabTitles="tabTitles">
        <!-- Sales Tnflow Table -->
        <template #sales_inflow>
          <app-table-wrapper searchLabelText="Search for client">
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
          <app-table-wrapper searchLabelText="Search for client">
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
          <app-table-wrapper searchLabelText="Search for client">
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
import { ref, computed} from "vue"

import { Pagination } from '@/types'

// ============ Componeents ============//
import AppTab from "@/components/AppTab.vue";
import AppTable from "@/components/AppTable.vue";
import TableFooter from '@/components/AppTableFooter.vue'
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const loading = ref(false)
const salesTableData = ref([
    {
        "RESELLER NAME": "Ela John",
        "NUMBER": "09138208161",
        "Ordered Item": "Nivea Roll on",
        "Order Amount": 2000,
        "Amount Paid": 2400,
        "Channel": "BANK TRANSFER",
        "Order ID": "463612More3421543",
        "Date": "May 16 2024 ",
        "Status": "Full Delivery"
    },
])

const cashInflowTableData = ref([
    {
        "Reseller Name": "Ela John",
        "Number": "09138208161",
        "Product": "Nivea Roll on",
        "Amount": 2000,
        "Payment Channel": "BANK TRANSFER",
        "Reference": "463612More3421543",
        "Date": "May 16 2024 ",
    },
])

const cashOutflowTableData = ref([
    {
        "Reseller Name": "Ela John",
        "Number": "09138208161",
        "Product": "Nivea Roll on",
        "Amount": 2000,
        "Payment Channel": "BANK TRANSFER",
        "Reference": "463612More3421543",
        "Date": "May 16 2024 ",
    },
])

const tabTitles = ref([ "sales inflow", "cash inflow", "cash outflow"])

const pagination = computed<Pagination>(() => {
  return {
    total: 0,
    currentPageTotal: 0,
    currentPageNo: 1,
    totalNoPages: 1
  }
});
</script>
