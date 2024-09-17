<template>
    <section>
        <app-table-wrapper searchLabelText="Search by Order Number" hasDelete>
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            loading-text="Loading... Please wait" 
        >

            <template v-slot:item.action="{ item }">
                <v-btn color="primary" class="rounded-lg"> <Printer :size="20" class="mr-2" /> Print </v-btn> 
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" />
            </template>
        </v-data-table>
        </app-table-wrapper>

        <OrderReturnForm :openModal="openModal" @close="openModal = false"  status="Approval" />
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Printer } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import OrderReturnForm from "../../Modals/OrderReturnForm.vue";

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const openModal = ref(false)
const headers = ref<any[]>([
    {
    align: 'start',
    key: 'order_number',
    sortable: false,
    title: 'Order No',
    },
    { key: 'date', title: 'Date' },
    { key: 'reseller_name', title: 'Reseller Name' },
    { key: 'warehouse', title: 'Warehouse' },
    { key: 'return_type', title: 'Return Type' },
    { key: 'amount_return', title: 'Amount to Return' },
    { key: 'amount_retain', title: 'Amount to Retain' },
    { key: 'action', title: 'Action' },
])
</script>