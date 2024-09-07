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
                <app-chip status="pending">
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

            <template v-slot:item.pop="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>
            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" @click="router.push('/order/123')" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" />
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';

const props = defineProps<{
    items: any[],
    loading: boolean 
}>()
const select = ref('')
const router = useRouter()
const actionOptions = ref([
    { label: 'Pending', value: 'pending' },
    { label: 'In Transit', value: 'transit' },
    { label: 'processing', value: 'processing' },
    { label: 'Cancelled', value: 'cancelled' },
    { label: 'Delivered', value: 'delivered' },
])

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
</script>