<template>
    <section>
        <app-table-wrapper searchLabelText="Search for client" hasDelete  tableName="orders" @search="search" @export="emits('export', $event)" @filter="emits('filter', $event)">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            :items-per-page="pagination?.currentPageTotal"
            loading-text="Loading... Please wait" 
        >

            <template v-slot:item.status="{ item }">
                <app-chip :status="item.status">
                </app-chip>
            </template>

            <template v-slot:item.action="{ item }">
                <p class="tw-text-[18px] tw-underline" v-if="!item.is_return_processed" @click="processReturn(item)">Process Return</p>
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination"  @next="next($event)"/>
            </template>
        </v-data-table>
        </app-table-wrapper>
        
        <OrderReturnForm :openModal="openModal" @close="openModal = false" :order="itemToProcess" />
    </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, watch, computed} from "vue";

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { ORDER_STATUS_OPTION } from "@/constants/common.ts";

import OrderReturnForm from "../../Modals/OrderReturnForm.vue";
import { useOrderStore } from "@/stores";

const orderStore = useOrderStore();
const { 
  returned_orders,
} = storeToRefs(orderStore)
const props = defineProps<{
    items: any[],
    loading: boolean ,
    pagination?: any,
}>()

const emits = defineEmits<{
    (e: "filter", item: any):void;
    (e: "export", item: any):void;
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
}>()

const page =  ref(1)
const select = ref("")
const openModal = ref(false)
const itemToProcess = ref<any>({})
const actionOptions = ref(ORDER_STATUS_OPTION)

const payload= ref({
    page: 1,
    search: "",
})

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
    { key: 'action', title: 'Action' , width: "20%"},
])

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value)
}

const processReturn = (item: any) => {
    itemToProcess.value = returned_orders.value.data.find((elm:any)=> elm.order_id === item.id);
    openModal.value = true;
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}
</script>