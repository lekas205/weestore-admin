<template>
    <section class="tw-p-[30px]">
        <v-btn color="primary" @click="$router.back()"> <ChevronLeft/> Back </v-btn>


        <app-table-wrapper searchLabelText="Search by Name,email,phone" class="tw-mt-[50px]">
            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="custom-table"
            >

                <template v-slot:item.status="{ item }">
                    <p class="text-primary text-capitalize"> {{ item.status}} </p>
                </template>
                <template v-slot:item.action="{ item }">
                    <div class="tw-flex tw-items-center tw-gap-4">
                        <v-btn color="primary"> Verify </v-btn>
                        <v-btn color="primary"> Delete </v-btn>
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
import { ChevronLeft } from 'lucide-vue-next'

import TableFooter from '@/components/AppTableFooter.vue';
import AppTableWrapper from "@/components/AppTableWrapper.vue";

const router = useRouter()
const headers = ref([
    {
    align: 'start',
    key: 'name',
    sortable: false,
    title: 'Client Fullname',
    },
    { key: 'email', title: 'Email' },
    { key: 'phone_no', title: 'Phone Number' },
    { key: 'status', title: 'Status' },
    { key: 'action', title: 'Action' },
])

const items = ref([
    {
        id: 123,
        date: "May 16 2024 9:23 AM",
        name: "Olalekan Micheal",
        email: "micheal@gmail.com",
        phone_no: "09087543243",
        status: "unverified",
    }
])
</script>
