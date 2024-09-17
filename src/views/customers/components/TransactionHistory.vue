<template>
    <section class="mt-5">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            loading-text="Loading... Please wait" 
            class="custom-table"
        >

            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>

            <template  v-slot:bottom>
                <!-- <TableFooter v-bind="pagination" /> -->
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';

const props = defineProps<{
    items: any[],
    loading: boolean 
}>()

const headers = ref<any[]>([
    {
        align: 'start',
        key: 'date',
        sortable: false,
        title: 'Date',
    },
    { key: 'purpose', title: 'Purpose' },
    { key: 'position', title: 'Position' },
    { key: 'amount', title: 'Amount' },
    { key: 'method', title: 'Payment Method' },

])
</script>