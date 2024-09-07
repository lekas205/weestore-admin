<template>
    <section class="px-4 py-5">
        <StatCard />

        <app-table-wrapper searchLabelText="Search by Name,email,phone" class="tw-mt-[50px]">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <ZoomIn @click="router.push('/customers/'+item.id)" />
                        <Trash2 />
                    </div>
                </template>

                <template  v-slot:bottom>
                    <TableFooter v-bind="pagination" />
                </template>
            </v-data-table>
        </app-table-wrapper>
    </section>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Trash2, ZoomIn } from 'lucide-vue-next'

import StatCard from "./components/StatCard.vue";
import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const router = useRouter();

const loading = ref(false);
const headers = ref([
    {
    align: 'start',
    key: 'id',
    sortable: false,
    title: 'ID',
    },
    { key: 'date', title: 'Joining Date' },
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'contact', title: 'How do you hear about us' },
    { key: 'action', title: 'Action' },
])

const items = ref([
    {
        id: 123,
        date: "May 16 2024 9:23 AM",
        name: "Olalekan Micheal",
        email: "micheal@gmail.com",
        phone_no: "09087543243",
        contact: "telegram",
    }
])
</script>
