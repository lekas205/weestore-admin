<template>
    <section>
        <app-table-wrapper searchLabelText="Search by Categories Name" @search="search">
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

            <template v-slot:item.action="{ item }">
                <v-select
                    v-model="select"
                    :items="actionOptions"
                    item-title="label"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                ></v-select>
            </template>
            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="router.push(`/order/${item.id}`)"/>
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" v-model:page="page" />
            </template>
        </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ZoomIn } from 'lucide-vue-next'
import { useRouter } from "vue-router";

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const router = useRouter()

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const emits = defineEmits<{
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
}>()

const select = ref<any>();
const page = ref<number>(1);
const payload= ref({
    page: 1,
    search: "",
});
const actionOptions = ref([
    { label: 'Pending', value: 'pending' },
    { label: 'In Transit', value: 'transit' },
    { label: 'processing', value: 'processing' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Delivered', value: 'delivered' },
]);

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
    { key: 'action', title: 'Action', width: "20%" },
])

watch(()=> page.value, (newPage: number)=>{
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