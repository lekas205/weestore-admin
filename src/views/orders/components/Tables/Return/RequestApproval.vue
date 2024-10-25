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
                <v-btn color="primary" class="rounded-lg" @click="downloadOrder(item)"> <CloudDownload :size="20" class="mr-2" /> Download </v-btn> 
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" @next="next($event)" />
            </template>
        </v-data-table>
        </app-table-wrapper>

        <VueHtml2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            :filename="`order-return-breakdown`"
            :pdf-quality="2"
            :manual-pagination="false"
            pdf-format="a4"
            :pdf-margin="10"
            pdf-orientation="portrait"
            pdf-content-width="800px"
            ref="html2Pdf"
        >
            <template  v-slot:pdf-content>
                <DownloadReturnInvoice  :order="itemToProcess"  status="Approval" />
            </template>
        </VueHtml2pdf>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { CloudDownload } from 'lucide-vue-next'
import VueHtml2pdf from "vue3-html2pdf";

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

import DownloadReturnInvoice from "./DownloadReturnInvoice.vue";
import { useOrderStore } from "@/stores";

const orderStores  = useOrderStore()

const { approved_return_requests } = storeToRefs(orderStores)
const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const emits = defineEmits<{
    (e: "fetchMore", page: any): void;
    (e: "filter", val: any): void;
    (e: "updateStatus", select: any): void;
}>()

const html2Pdf = ref();
const payload= ref({
    page: 1,
    search: "",
})

const openModal = ref(false);
const itemToProcess = ref<any>({})
const headers = ref<any[]>([
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
    { key: 'action', title: 'Action' },
])

const next = (page: number) => {
    payload.value.page = Number(page);
    emits("fetchMore", payload.value);
}

const search = (text: string) => {
    payload.value.search = text;
    payload.value.page = 1;
    emits("fetchMore", payload.value)
}

const downloadOrder = (item: any) => {
    itemToProcess.value = approved_return_requests.value.data.find((elm:any)=> elm.request_id === item.id);
    console.log( item.id,  approved_return_requests.value.data );
    openModal.value =true;

    setTimeout(() => {
    html2Pdf.value.generatePdf();
  }, 1500);
}
</script>