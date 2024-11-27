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
                <v-btn  color="red" size="large" @click="proceed" :disabled="disableBtn"> Proceed</v-btn>
            </div>
        </v-card>
     </v-dialog>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import AppInput from "@/components/AppInput.vue";
  import { formatDate2 } from "@/utils";

  const emits = defineEmits<{
    (e: "update:openModal",  val: boolean): void
    (e: "proceed",  val: any): void
  }>()
  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
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