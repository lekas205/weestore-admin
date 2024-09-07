<template>
    <section class="mt-6 px-5  pb-5">
        <div  class="tw-p-5 tw-rounded-[30px] tw-bg-white">
            <h1 class="tw-text-[30px] tw-font-bold tw-mb-4">Order Invoice</h1>
            <div class="tw-flex tw-items-center tw-gap-3">
                <span>STATUS</span>
                <app-chip status="pending"></app-chip>
            </div>

            <div class="tw-flex tw-justify-between tw-mt-[100px] tw-mb-[70px]">
                <div class="t">
                    <h4 class="tw-font-bold">DATE</h4>
                    <p>May 18, 2024</p>
                </div>

                <div class="tw-text-center">
                    <h4 class="tw-font-bold">ORDER NUMBER</h4>
                    <p>#1119</p>
                </div>

                <div class="tw-text-center tw-w-[300px]">
                    <h4 class="tw-font-bold"> INVOICE TO </h4>
                    <p>Adekunle seun 912423432 Adekunle@gmail.com 23 Ire Akari Estte, Ajoa Lgos Warehouse 1 Ibadan</p>
                </div>
            </div>

            <v-data-table 
                hide-default-footer 
                :items="items" 
                :loading="loading" 
                :headers="headers"
                loading-text="Loading... Please wait" 
                class="elevation-1 custom-table"
            >
            <template v-slot:item.amount="{ item }">
                <p class="tw-text=primary"> {{item.amount}} </p>
            </template>
        </v-data-table>

        <div class="tw-flex tw-justify-between tw-bg-[#EFEEEE] tw-border tw-border-[#A4A9AE75] tw-py-[20px] tw-px-[60px] tw-mt-[40px]">
                <div class="tw-text-center">
                    <h4 class="tw-font-bold tw-mb-2">OPAYMENT METHOD</h4>
                    <p>Pay on Delivery</p>
                </div>

                <div class="tw-text-center">
                    <h4 class="tw-font-bold tw-mb-2">TOTAL AMOUNT</h4>
                    <p class="tw-text-primary tw-font-[500]">#3,500</p>
                </div>
            </div>
        </div>

        <div class="tw-flex tw-justify-between tw-mt-[40px]" >
            <v-btn color="primary" size="large" class="tw-rounded-lg"> <img src="@/assets/images/svg/download-icon.svg" alt="" class="tw-w-[25px] tw-mr-2"> Download Invoice</v-btn>
            <v-btn color="primary" size="large" class="tw-rounded-lg"> <img src="@/assets/images/svg/print-icon.svg" alt="" class="tw-w-[18px] tw-mr-2"> Print Invoice</v-btn>
        </div>
    </section>
  
    
</template>

<script lang="ts" setup>
import { ref } from "vue";
import AppChip from "../../components/AppChip.vue";

const headers = ref([
{
    align: 'start',
    key: 'sr',
    sortable: false,
    title: 'SR',
    },
    { key: 'product_tile', title: 'Product Title' },
    { key: 'quantity', title: 'Quantity' },
    { key: 'price', title: 'Item Price' },
    { key: 'amount', title: 'Amount' },



])
</script>
