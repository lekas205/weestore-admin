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

            <!-- <template v-slot:item.action="{ item }">
                <v-menu :location="'bottom'">
                    <template v-slot:activator="{ props }">
                        <Ellipsis  v-bind="props" class="tw-cursor-pointer" />
                    </template>

                    <v-list>
                        <v-list-item>
                            <v-btn color="green" variant="text" @click="approveReturn(item)"> Approve </v-btn>
                        </v-list-item>
                        <v-list-item>
                            <v-btn color="red" variant="text"> Decline </v-btn>
                        </v-list-item>
                    </v-list>
                    </v-menu>
               
            </template> -->

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination"  @next="next($event)"/>
            </template>
        </v-data-table>
        </app-table-wrapper>

    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Ellipsis } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";


const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination?: any
}>()

const emits = defineEmits<{
    (e: "filter", val: any): void;
    (e: "fetchMore", page: any): void;
    (e: "updateStatus", select: any): void;
}>()

const openModal = ref(false)
const payload= ref({
    page: 1,
    search: "",
});
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
    // { key: 'action', title: 'Action' },
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