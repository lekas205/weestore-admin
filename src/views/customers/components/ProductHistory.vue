<template>
    <section class="mt-5">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            :items-per-page="pagination?.currentPageTotal"
            loading-text="Loading... Please wait" 
            class="custom-table"
        >

            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination"  @next="emits('next', {page: $event})"/>
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination:any 
}>()

const emits = defineEmits<{
    (e: 'next', val: any): void
}>();

const headers = ref<any[]>([
    {
        align: 'start',
        key: 'product_name',
        sortable: false,
        title: 'Name of Product',
    },
    { key: 'unit', title: 'Unit' },
    { key: 'whp', title: 'WHP' },
    { key: 'unit_amount', title: 'Unit Amount' },
    { key: 'total_amount', title: 'Total Amount' },
    { key: 'warehouse_name', title: 'Warehouse' },
    { key: 'category', title: 'Category' },
    { key: 'start_date', title: 'Purchase Date' },
    { key: 'end_date', title: 'Withdrawal Date' },
    // { key: 'withdrawable', title: 'Withdrawable AMT' },
    // { key: 'transferable', title: 'Transferrable AMT' },

])
</script>