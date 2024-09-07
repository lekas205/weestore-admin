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
                <div class="tw-flex tw-gap-3">
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

                    <p class="tw-text-[18px] tw-underline tw-w-[30%]" @click="openModal=true">Process Return</p>
                </div>
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination" />
            </template>
        </v-data-table>

        <OrderReturnForm :openModal="openModal" @close="openModal = false" />
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import OrderReturnForm from "../../Modals/OrderReturnForm.vue";
const props = defineProps<{
    items: any[],
    loading: boolean 
}>()

const select = ref("")
const openModal = ref(false)
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
    { key: 'action', title: 'Action' , width: "25%"},

])
</script>