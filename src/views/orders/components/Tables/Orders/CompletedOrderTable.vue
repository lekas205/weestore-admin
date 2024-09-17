<template>
    <section>
        <app-table-wrapper searchLabelText="Search for client" @search="search">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            loading-text="Loading... Please wait" 
        >

            <template v-slot:item.status="{ item }">
                <app-chip :status="item.status">
                </app-chip>
            </template>

            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="router.push(`/order/${item.id}`)" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" v-model:page="page"/>
            </template>
        </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";


const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const emits = defineEmits<{
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
}>()

const router = useRouter();
const page = ref<number>(1);

const payload= ref({
    page: 1,
    search: "",
});

const headers = ref<any[]>([
    {
    align: 'start',
    key: 'order_number',
    sortable: false,
    title: 'Order Number',
    },
    { key: 'date', title: 'Date' },
    { key: 'reseller_name', title: 'Reseller Name' },
    { key: 'warehouse', title: 'Warehouse' },
    { key: 'channel', title: 'Channel' },
    { key: 'amount', title: 'Amount' },
    { key: 'status', title: 'Status' },
    { key: 'view_order', title: 'View' },
])

watch(()=> page.value, (newPage: number)=> {
    if(newPage){
        payload.value.page = Number(newPage);
        emits("fetchMore", payload.value)
    }
})

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}
</script>