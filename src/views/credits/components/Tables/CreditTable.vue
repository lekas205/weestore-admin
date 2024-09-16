<template>
    <section class="mt-5">
        <app-table-wrapper searchLabelText="Search by Order Number">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            class="custom-table"
            loading-text="Loading... Please wait" 
        >

            <template v-slot:item.status="{ item }">
                <p class="tw-text-[#0CAE13]"> {{ item.status}} </p>

            </template>

            <template v-slot:item.action="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="emits('showDetails')" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" />
            </template>
        </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const props = defineProps<{
    items: any[],
    loading: boolean 
}>()

const emits = defineEmits<{
    (e: "showDetails"): void
}>()

const headers = ref([
    {
     align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Name',
    },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'amount', title: 'Amount' },
    { key: 'duration', title: 'Duration' },
    { key: 'balance', title: 'Balance' },
    { key: 'request_date', title: 'Request Date' },
    { key: 'next_payment', title: 'Next Payment' },
    { key: 'status', title: 'Loan Status' },
    { key: 'action', title: 'Action' },
])
</script>