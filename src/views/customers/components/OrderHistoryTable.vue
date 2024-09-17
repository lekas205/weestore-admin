<template>
    <section class="mt-5">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            class="custom-table"
            loading-text="Loading... Please wait" 
        >

            <template v-slot:item.status="{ item }">
                <app-chip :status="item.status">
                </app-chip>
            </template>

            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>

            <template  v-slot:bottom>
                <!-- <TableFooter v-bind="pagination" v-model:page="page" /> -->
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';

const props = defineProps<{
    items: any[],
    loading: boolean 
}>()

const headers = ref<any[]>([
    {
     align: 'start',
    key: 'order_number',
    sortable: false,
    title: 'Order Number',
    },
    { key: 'date', title: 'Order Date' },
    { key: 'method', title: 'Method' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
])
</script>