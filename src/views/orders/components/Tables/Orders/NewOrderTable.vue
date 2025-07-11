<template>
    <section>
        <app-table-wrapper 
            searchLabelText="Search by Order Number" t
            tableName="orders" 
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
                <app-select
                    :value="item.action"
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
                <ZoomIn class="tw-cursor-pointer" @click="viewPOP(item.payment_proof)" />
            </template>
            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="router.push(`/order/${item.id}`)" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" @next="next($event)" />
            </template>
        </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { ZoomIn } from 'lucide-vue-next'
import { SAVED_ADMIN_ROLE } from '@/constants';

import AppChip from "@/components/AppChip.vue";
import AppSelect from "@/components/AppSelect.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import { openToastNotification } from '@/utils'
import { ORDER_STATUS_OPTION } from "@/constants/common.ts";

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination: any,
}>()

const emits = defineEmits<{
    (e: "filter", item: any):void;
    (e: "export", item: any):void;
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
    (e: "viewOrder", item: any):void
}>()

const select = ref('');
const page = ref(1)
const router = useRouter()
const actionOptions = ref(ORDER_STATUS_OPTION)

const payload= ref({
    page: 11,
    search: "",
})

const canHandle = computed(()=>{  
  let roles = [
      "superadmin",
      "customer_service",
      "internal_control_manager",
      "business_development_manager"
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE) as string;

  return roles.includes(adminRole )
})

const headers = computed<any[]>(()=>[
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
    canHandle.value ?  { key: 'action', title: 'Action' ,  width: "50%"}: {},
    { key: 'pop', title: 'View Pop' },
    { key: 'view_order', title: 'View Order' },
])

const updateStatus = (event:any, id:string) => {
    emits("updateStatus", {orderId: id, status: event.value})    
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

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value)
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}

// watch(()=> select.value, (newStatus)=>{
//     if(newStatus){
//         emits("updateStatus", newStatus)
//     }
// })
</script>