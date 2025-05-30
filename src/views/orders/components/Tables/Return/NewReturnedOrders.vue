<template>
    <section>
        <app-table-wrapper 
            noExport 
            searchLabelText="Search by Order Number" 
            @search="search($event)" 
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

            <template v-slot:item.action="{ item }">
                <v-menu :location="'bottom'">
                    <template v-slot:activator="{ props }">
                        <Ellipsis  v-bind="props" class="tw-cursor-pointer" />
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-btn color="green" variant="text" @click="approveReturn(item)"> Approve </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn color="red" variant="text" @click="emits('declineRequest', item.id)"> Decline </v-btn>
                        </v-list-item>
                    </v-list>
                    </v-menu>
               
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination"  @next="next($event)"/>
            </template>
        </v-data-table>
        </app-table-wrapper>

        <OrderReturnForm :openModal="openModal" @close="openModal = false"  @refreshData="emits('refreshData', $event)" status="Approval" :order="itemToProcess" />
    </section>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { Ellipsis } from 'lucide-vue-next'
import { SAVED_ADMIN_ROLE } from '@/constants';

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import OrderReturnForm from "../../Modals/OrderReturnForm.vue";
import { useOrderStore } from "@/stores";

const orderStores  = useOrderStore()

const { return_requests } = storeToRefs(orderStores)
const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination: any,
}>()

const emits = defineEmits<{
    (e: "filter", val: any): void;
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
    (e: "refreshData", val: string): void;
    (e: "declineRequest", id: string): void
}>()

const page = ref(1);
const openModal = ref(false);
const itemToProcess = ref<any>({})
const payload= ref({
    page: 1,
    search: "",
})

const canHandle = computed(()=>{  
  let roles = [
      "superadmin",
      'accountant',
      "internal_control_manager",
    ]
  const adminRole = localStorage.getItem(SAVED_ADMIN_ROLE) as string;
  return roles.includes(adminRole)
})
const headers = computed<any[]>(()=>[
    {
    align: 'start',
    key: 'order_number',
    sortable: false,
    title: 'Order No',
    },
    { key: 'date', title: 'Date' },
    { key: 'reseller_name', title: 'Reseller Name' },
    { key: 'warehouse', title: 'Warehouse' },
    { key: 'return_type', title: 'Return Type' },
    { key: 'amount_return', title: 'Amount to Return' },
    { key: 'amount_retain', title: 'Amount to Retain' },
    canHandle.value ? { key: 'action', title: 'Action' }: {} ,
])

const updateStatus = (event:any, id:string) => {
    emits("updateStatus", {orderId: id, status: event.value})    
}

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value);
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}

const approveReturn = (item: any) => {
    itemToProcess.value = return_requests.value.data.find((elm:any)=> elm.request_id === item.id);
    console.log( item.id,  return_requests.value.data );
    openModal.value =true;
}
</script>