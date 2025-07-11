<template>
    <section class="mt-6 px-5  pb-5">
        <div  class="tw-p-5 tw-rounded-[30px] tw-bg-white">
           
            <h1 class="tw-text-[30px] tw-font-bold tw-mb-4"> More Marketplace Ltd - <span class="tw-text-[25px]">Order Invoice</span> </h1>
            <div class="tw-flex tw-items-center tw-gap-3">
                <span>STATUS</span>
                <app-chip :status="orderDetails.status"></app-chip>
            </div>

            <div class="tw-flex tw-justify-between tw-mt-[100px] tw-mb-[70px]">
                <div class="t">
                    <h4 class="tw-font-bold">PURCHASED DATE</h4>
                    <p> {{ formatDate(orderDetails.created_data) }} </p>
                </div>

                <div class="tw-text-center">
                    <h4 class="tw-font-bold">ORDER NUMBER</h4>
                    <p>{{orderDetails.order_no }}</p>
                </div>

                <div class="tw-text-center tw-w-[300px]">
                    <h4 class="tw-font-bold"> INVOICE TO </h4>
                    <p> {{ orderDetails.customer_name }} {{ orderDetails.customer_phone }} {{ orderDetails.customer_email }} {{ orderDetails.customer_address }} </p>
                </div>
            </div>

            <v-data-table 
                hide-default-footer 
                :items="orderedItems" 
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
                    <h4 class="tw-font-bold tw-mb-2">PAYMENT METHOD</h4>
                    <p> {{PAYMENT_METHOD[orderDetails.payment_method]  }} </p>
                </div>

                <div class="tw-text-center">
                    <h4 class="tw-font-bold tw-mb-2">TOTAL AMOUNT</h4>
                    <p class="tw-text-primary tw-font-[500]"> {{ formatAsMoney(orderDetails.amount) }} </p>
                </div>
            </div>
            <div class="tw-mt-4">
                Kindly Pay into this account number  <br>
               <b> More MarketPlace Ltd </b> <br>
              <u>  1311174774 </u> <br>
                Zenith Bank
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import VueHtml2pdf from "vue3-html2pdf";

import { useOrderStore } from "@/stores";
import AppChip from "@/components/AppChip.vue";
import { PAYMENT_METHOD } from "@/constants";
import { 
   formatDate, 
   formatTime, 
   formatAsMoney, 
   formatText, 
   capitalizeFirstLeters
} from "@/utils";

const orderStore = useOrderStore();
const { 
   orderDetails
} = storeToRefs(orderStore)

const route = useRoute();
const headers = ref<any[]>([
{
   align: 'start',
   key: 'sr',
   sortable: false,
   title: 'SR',
   },
   { key: 'product_name', title: 'Product Name' },
   { key: 'quantity', title: 'Units' },
   { key: 'whp', title: 'WHP' },
   { key: 'interest', title: 'Dividends' },
   { key: 'price', title: 'Unit Price' },
   { key: 'amount', title: 'Amount' },
])

const orderedItems = computed<any[]>(()=>{
   return orderDetails.value?.orderItems?.map((elm:any, index:number)=> {
       return {
           sr: index + 1,
           product_name: capitalizeFirstLeters(elm.product_name),
           price: formatAsMoney(elm.price),
           whp: elm.whp,
           interest: elm.interest,
           amount: formatAsMoney(elm.amount),
           quantity: elm.quantity
       }
   })
})
</script>
