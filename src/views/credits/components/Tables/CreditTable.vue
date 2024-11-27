<template>
    <section class="mt-5">
        <app-table-wrapper searchLabelText="Search by Order Number" @search="search" @filter="emits('filter', $event)">
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
                <ZoomIn class="tw-cursor-pointer" @click="emits('showDetails', item)" />
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
    loading: boolean,
    pagination?: any,
}>()

const emits = defineEmits<{
    (e: "filter", val: any): void;
    (e: "fetchMore", page: any): void;
    (e: "showDetails", val: any): void;
}>()

const payload= ref({
    page: 1,
    search: "",
});

const headers = ref<any[]>([
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

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value)
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}
</script>