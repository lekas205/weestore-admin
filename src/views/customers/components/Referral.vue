<template>
    <section class="mt-5">
        <v-data-table 
            hide-default-footer 
            :items="items" 
            :headers="headers"
            class="custom-table"
            loading-text="Loading... Please wait" 
        >
        </v-data-table>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";


const props = defineProps<{
    items: any[],
}>()

const emits = defineEmits<{
    (e: 'next', val: any): void
}>();

const headers = ref<any[]>([
    { key: 'first_name', title: 'First Name' },
    { key: 'last_name', title: 'Last Name' },
    { key: 'phone', title: 'Phone Number' },
])
</script>