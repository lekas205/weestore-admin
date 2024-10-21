<template>
    <section>
        <app-table-wrapper  
            tableName="orders"   
            searchLabelText="Search by Categories Name" 
            @search="search" 
            @export="emits('export', $event)"   
            @filter="emits('filter', $event)"
        >
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
                <!-- <v-select
                    v-model="select"
                    :items="actionOptions.slice(5, 7)"
                    item-title="label"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                ></v-select> -->
                <app-select
                    @update="updateStatus($event, item.id)"
                    :options="actionOptions.slice(5, 6)"
                    item-title="label"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    return-object
                    single-line
                ></app-select>
            </template>
            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="router.push(`/order/${item.id}`)"/>
            </template>
            <template v-slot:item.pop="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="viewPOP(item.payment_proof)" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" @next="next($event)"/>
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
import AppSelect from "@/components/AppSelect.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { openToastNotification } from '@/utils';
import { ORDER_STATUS_OPTION } from "@/constants/common.ts";


const router = useRouter()

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const emits = defineEmits<{
    (e: "filter", item: any):void;
    (e: "export", item: any):void;
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
}>()

const select = ref<any>();
const page = ref<number>(1);
const actionOptions = ref(ORDER_STATUS_OPTION)

const payload= ref({
    page: 1,
    search: "",
});

const updateStatus = (event:any, id:string) => {
    emits("updateStatus", {orderId: id, status: event.value})    
}


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
    { key: 'pop', title: 'View Pop' },
    { key: 'view_order', title: 'View' },
    { key: 'action', title: 'Action' },
])

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value)
}

const viewPOP = (image_url: string) => {    
    if(!image_url) {
        return openToastNotification({
          message: "This order doesn't have a proof of payment",
          variant: 'error'
        });
    }
    window.open(image_url, "_blank");
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}
</script>