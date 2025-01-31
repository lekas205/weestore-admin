<template>
    <v-dialog persistent v-model="setShow" class="dialog" scrollable max-width="35vw">
        <v-card class="px-4 py-7">
            <h3 class="text-center tw-font-[700] tw-underline">Assign a Driver to Order</h3>
            <v-row class="mt-5">
                <v-col  :md="4" :col="6"> Name of Driver </v-col>
                <v-col :md="8" :col="12">
                    <v-autocomplete
                        v-model="select"
                        :items="driverList"
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
                <app-button @click="proceed"> Proceed </app-button>
                <app-button secondary @click="setShow = false"> Cancel </app-button>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
    import { storeToRefs } from "pinia";
    import { ref, computed, onMounted } from "vue"

    import AppButton from "@/components/AppButton.vue";

    import { formatText } from "@/utils";
    import { useDriverStore } from "@/stores";

    const driverStore = useDriverStore()
    const {drivers }  = storeToRefs(driverStore)
    const props = defineProps<{
        openModal: boolean
    }>()

    const emits = defineEmits<{
        (e : "proceed", id: string): void
        (e : "update:openModal", val: boolean): void
    }>()

    const select = ref<string>("");

    const driverList = computed(()=>{
        return drivers.value?.data?.map((elm: any)=> {
            return {
                id: elm.driver_id,
                name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`
            }
        })
    })

    const setShow = computed({
        get() {
            return props.openModal;
        },
        set(newValue) {
            emits("update:openModal", newValue);
        },
    })

    const proceed = () => {
        emits("proceed", select.value)
        setShow.value = false
    }

    onMounted(async ()=>{
        await driverStore.fetchAllDrivers({liimit: 200})
    })
</script>
