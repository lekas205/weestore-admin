<template>
    <v-data-table 
        hide-default-footer 
        :items="items" 
        :loading="loading" 
        loading-text="Loading... Please wait" 
    >
        <!-- <template  v-slot:table-slot>
            <slot name='table-slot' />
        </template> -->
        <template  v-slot:bottom>
            <!-- <TableFooter v-bind="pagination" /> -->
        </template>
     </v-data-table>
</template>

<script lang="ts" setup>
import TableFooter from '@/components/AppTableFooter.vue';

 const props = defineProps<{
    headers?: any[],
    items: any[],
    loading: boolean
 }>()
</script>
