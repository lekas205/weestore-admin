<template>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="40vw">
        <v-card class="py-5 tw-px-[30px]">
            <h1 class="tw-text-[32px] tw-font-[500] text-center">Loan Details</h1>
            <div class="tw-absolute tw-right-7 cursor-pointer" @click="emits('close')">
                <X color="#FE0000"/>
            </div>

            <div class="tw-w-[70%] tw-mt-[30px]">
                <div class="tw-flex tw-justify-between mb-3 tw-items-center">
                    <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Amount </p>
                    <p class="tw-text-[20px] tw-font-[700]"> {{loanDetails.amount }} </p>
                </div>
                <div class="tw-flex tw-justify-between mb-3 tw-items-center">
                    <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Duration </p>
                    <p class="tw-text-[20px] tw-font-[700]"> {{ loanDetails.duration }} Month(s)</p>
                </div>
                <div class="tw-flex tw-justify-between mb-3 tw-items-center">
                    <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Disbursement </p>
                    <p class="tw-text-[20px] tw-font-[700]"> {{ loanDetails.balance }} </p>
                </div>
                <div class="tw-flex tw-justify-between mb-3 tw-items-center mt-5">
                    <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Weekly Repayment </p>
                    <p class="tw-text-[20px] tw-font-[700]"> {{ loanDetails.balance }} </p>
                </div>

                <!-- <div >
                    <div class="tw-flex tw-justify-between mb-3 tw-items-center mt-4">
                        <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Amount Paid </p>
                        <p class="tw-text-[20px] tw-font-[700]"> N200,000</p>
                    </div>
                    <div class="tw-flex tw-justify-between mb-3 tw-items-center mt-4">
                        <p class="tw-text-[#00000094] tw-font-[700] tw-text-[21px]"> Amount Left </p>
                        <p class="tw-text-[20px] tw-font-[700]"> N200,000</p>
                    </div>
                </div> -->
               
            </div>
            <div class="" v-if="loanDetails.status == 'Pending' ">
                <p class="tw-text-[18px] tw-px-[40px] text-center mt-5" >
                    Note: By clicking  <b>Approve</b>, you approve the sum of N200,000 to be paid into Rita Alex’s bank account
                </p>

                <div class="tw-flex tw-justify-center mt-5 tw-gap-[30px] mb-3">
                    <v-btn color="green" size="large" :disabled="loading" :loading="loading && status === 'approve' " @click="proceed('approve')"> Approve </v-btn>
                    <v-btn color="primary" size="large" @click="proceed('reject')" :disabled="loading" :loading="loading && status === 'reject'"> Decline </v-btn>
                </div>
            </div>
           
        </v-card>  
    </v-dialog>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { X } from 'lucide-vue-next';
  import { formatAsMoney } from "@/utils";

  const emits = defineEmits<{
    (e: "close"): void;
    (e: "action", val: any): void
  }>()

  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loanDetails: {
        type: Object,
        default:() => {
            return {}
        }
    }
 })

 const status = ref("")

 const proceed = (action: string) => {
    status.value = action
    emits('action', {id: props.loanDetails.id, action })
 }
</script>
