<template>
    <v-dialog persistent v-model="setShow" class="dialog" scrollable max-width="35vw">
        <v-card class="px-4 py-7">
            <h3 class="text-center tw-font-[700] tw-underline">Assign a Driver to Order</h3>
            <v-row class="mt-5">
                <v-col  :md="4" :col="6"> Name of Driver </v-col>
                <v-col :md="8" :col="12">
                    <v-autocomplete
                        v-model="select"
                        :items="drivers"
                        density="compact"
                        label="Search for driver by name"
                        item-title="name"
                        item-value="id"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <div class="text-center tw-text-primary tw-text-[14px]">
                By Clicking on PROCEED, you have automatically assigned this request to a driver.
            </div>

            <div class="tw-flex tw-justify-center tw-gap-7 mt-5">
                <app-button > Proceed </app-button>
                <app-button secondary @click="setShow = false"> Cancel </app-button>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue"

import AppButton from "@/components/AppButton.vue";

import { useDriverStore } from "@/stores";

const driverStore = useDriverStore()

    const props = defineProps<{
        openModal: boolean
    }>()

    const emits = defineEmits<{
        (e : "update:openModal", val: boolean): void
    }>()

    const select = ref("")
    const drivers = ref([
        {name: "Folorunsho Davis", id: "esdouyhjkdfdxcv"},
        {name: "Peace Davis", id: "esdouyhjkdfdxcv"},
        {name: "John Davis", id: "esdouyhjkdfdxcv"},
        {name: "Mke Davis", id: "esdouyhjkdfdxcv"},
    ])

    const setShow = computed({
        get() {
            return props.openModal;
        },
        set(newValue) {
            emits("update:openModal", newValue);
        },
    })

    onMounted(async ()=>{
        await driverStore.fetchAllDrivers()
    })
</script>
