<template>
    <v-dialog persistent v-model="setShow" class="dialog" scrollable max-width="35vw">
       <v-card class="px-4 py-7">
           <h2 class="tw-font-bold tw-text-[20px] mb-4">Bank Details</h2>
           <div class=" pa-4 rounded-lg"> 
                <div class="tw-flex tw-justify-between mb-2">
                    <p class="tw-text-[20px]">Bank Name:</p>
                    <p class="tw-text-[20px]"> {{bankDetails?.bankName }} </p>
                </div>
                <div class="tw-flex tw-justify-between mb-2"> 
                    <p class="tw-text-[20px]">Acct Name:</p>
                    <p class="tw-text-[20px]"> {{ bankDetails.accountName }} </p>
                </div>
                <div class="tw-flex tw-justify-between">
                    <p class="tw-text-[20px]">Acct Number:</p>
                    <p class="tw-text-[20px]"> {{ bankDetails.accountNumber }} </p>
                </div>
                <p class="mt-6">Note: By clicking proceed you approve  the sum of <b> {{ details.amount }} </b> to be paid into  {{ bankDetails.accountName }}'s bank account</p>
            </div>

           <div class="tw-flex tw-gap-2 tw-justify-end tw-mt-[40px]">
               <v-btn variant="text" color="red" size="large" @click="setShow = false"> Cancel</v-btn>
               <v-btn  color="red" size="large" @click="proceed" > Proceed</v-btn>
           </div>
       </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
 import { computed, ref, watch } from 'vue'
 import AppInput from "@/components/AppInput.vue";
 import { formatAsMoney, formatDate2 } from "@/utils";

 const emits = defineEmits<{
   (e: "update:openModal",  val: boolean): void
   (e: "proceed",  val: any): void
 }>()
 const props = defineProps({
   openModal: {
     type: Boolean,
     default: false,
   },
   details: {
    type: Object,
    default: () => ({})
   }
//    bankDetails: {
//      type: Object,
//      default: () => ({})
//    },
//    amount:{
//     type: Number,
//     default: 0
//    }
})

const start_date = ref("");
const end_date = ref("");
const form = ref<any>({
   start_date: "",
   end_date: ""
})

const setShow = computed({
   get() {
       return props.openModal;
   },
   set(newValue) {
       emits("update:openModal", newValue);
   },
})

const bankDetails = computed(() => {
   return props.details?.bank || {};
})

const disableBtn = computed(()=> !(form.value.start_date.length  && form.value.end_date.length))

const proceed = () => {
   emits("proceed", form.value )
   setTimeout(()=>{
       form.value.start_date = ""
       form.value.end_date = ""
   }, 1000)
}

watch(()=> start_date.value, (newDate) => {
   if(newDate){        
       form.value.start_date =  formatDate2(newDate , "y-m-d")
   }
})

watch(()=> end_date.value, (newDate) =>{ 
   if(newDate){
       form.value.end_date =  formatDate2(newDate , "y-m-d")
   }
})
</script>