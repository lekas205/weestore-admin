<template>
    <section>
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
                <app-select
                    :value="item.status"
                    @update="updateStatus($event, item.id)"
                    :options="actionOptions"
                    item-title="label"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                ></app-select>
            </template>

            <template v-slot:item.pop="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>
            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="emits('viewOrder', item)" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" v-model:page="page" />
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import { ORDER_STATUS } from "@/constants/common.ts";

import AppSelect from "@/components/AppSelect.vue";

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination: any,
}>()

const emits = defineEmits<{
    (e: "fetchMore", page: number): void;
    (e: "updateStatus", select: any): void;
    (e: "viewOrder", item: any):void
}>()

const select = ref('');
const page = ref(1)
const router = useRouter()
const actionOptions = ref(ORDER_STATUS)

const headers = ref([
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
    { key: 'action', title: 'Action' ,  width: "50%"},
    { key: 'pop', title: 'View Pop' },
    { key: 'view_order', title: 'View Order' },
])

const updateStatus = (event, id) => {
    emits("updateStatus", {orderId: id, status: event.value})    
}

watch(()=> page.value, (newPage)=>{
    if(newPage){
        emits("fetchMore", page.value)
    }
})

// watch(()=> select.value, (newStatus)=>{
//     if(newStatus){
//         emits("updateStatus", newStatus)
//     }
// })
</script>