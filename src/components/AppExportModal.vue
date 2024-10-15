<template>
    <v-dialog persistent v-model="setShow" class="dialog" scrollable max-width="35vw">
       <v-card class="px-4 py-7">
           <h2 class="tw-font-bold tw-text-[20px] mb-4">Select Dates</h2>
           <div class="tw-flex tw-gap-4">
                <div class="tw-w-[50%]">
                    <small class="tw-font-bold">Form:</small>
                    <app-input v-bind="props" type="date"  placeholder="Please select start date" v-model:value="start_date"></app-input>
                </div>
                <div class="tw-w-[50%]">
                    <small class="tw-font-bold">To:</small>
                    <app-input v-bind="props" type="date" placeholder="Please select end date" v-model:value="end_date"></app-input>
                </div>
           </div>

           <div class="tw-flex tw-gap-2 tw-justify-end tw-mt-[40px]">
               <v-btn variant="text" color="red" size="large" @click="setShow = false"> Cancel</v-btn>
               <v-btn  color="red" size="large" @click="proceed" :loading="exporting" :disabled="disableBtn"> Export</v-btn>
           </div>

           <download-excel
           type="csv"
            class="btn btn-default download-excel-btn"
            :data="dataToExport"
            :fields="json_fields"
            worksheet="My Worksheet"
            :name="fileName"
            >
            </download-excel>
       </v-card>

      
    </v-dialog>
</template>

<script setup lang="ts">
 import { computed, markRaw, nextTick, ref, watch } from 'vue'
 import AppInput from "@/components/AppInput.vue";
 import { formatDate2 } from "@/utils";

 import { useExportStore } from "@/stores";
import { storeToRefs } from 'pinia';

import { feilds } from "@/constants/exportFeilds.ts";

 const exportStore = useExportStore();
 const { dataToExport } = storeToRefs(exportStore)

 const emits = defineEmits<{
   (e: "update:openModal",  val: boolean): void
   (e: "proceed",  val: any): void
 }>();

 const props = defineProps({
   openModal: {
     type: Boolean,
     default: false,
   },
   tableName: String
});

const json_fields= computed(()=>{
    return feilds[props.tableName as keyof typeof feilds]
})

const fileName = computed(()=> "more-buy-"+ props.tableName + '.csv')

const exporting = ref(false);
const start_date = ref("");
const end_date = ref("");
const form = ref<any>({
   start_date: "",
   end_date: "",
   limit: '10000'
});

const setShow = computed({
   get() {
       return props.openModal;
   },
   set(newValue) {
       emits("update:openModal", newValue);
   },
})

const disableBtn = computed(()=> !(form.value.start_date.length  && form.value.end_date.length))

const proceed = () => {
    exporting.value = true
   emits("proceed", form.value )
   setTimeout(()=>{
       form.value.start_date = ""
       form.value.end_date = ""
   }, 1000)
}

const downloadSheet = async ()=>{
    await nextTick()
    const btn:any = document.getElementsByClassName("download-excel-btn")[0]
    btn.click();

    exporting.value = false
    emits('update:openModal', false)
}

watch(()=> start_date.value, (newDate) =>{
   if(newDate){        
       form.value.start_date =  formatDate2(newDate , "y-m-d")
   }
})

watch(()=> end_date.value, (newDate) =>{ 
   if(newDate){
       form.value.end_date =  formatDate2(newDate , "y-m-d")
   }
})

watch(()=> dataToExport.value, (newValue) =>{ 
   if(newValue.length){
    downloadSheet()
   }
})
</script>

<style>
.download-excel-btn{
    display: none;
}
</style>