<template>
    <section class="mt-5">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :loading="loading" 
            :headers="headers"
            :items-per-page="pagination?.currentPageTotal"
            loading-text="Loading... Please wait" 
            class="custom-table"
        >

            <template v-slot:item.view_order="{ item }">
                <ZoomIn class="tw-cursor-pointer" />
            </template>

            <template  v-slot:bottom>
                <TableFooter v-bind="pagination"  @next="emits('next', {page: $event})"/>
            </template>
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { ZoomIn } from 'lucide-vue-next'

import AppChip from "@/components/AppChip.vue";
import TableFooter from '@/components/AppTableFooter.vue';

const props = defineProps<{
    items: any[],
    loading: boolean,
    pagination:any 
}>()

const emits = defineEmits<{
    (e: 'next', val: any): void
}>();

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