<template>
    <v-select
        v-model="select"
        :items="options"
        item-title="label"
        item-value="value"
        label="Select"
        persistent-hint
        return-object
        single-line
    ></v-select>
</template>

<script lang="ts" setup>
import { ref,computed, watch } from "vue";

const props =  defineProps<{
    value?: string | undefined,
    options: any[]
}>()

const emits = defineEmits<{
    (e: "update", val: string): void
}>()

const select = computed({
    get() {
        return props.value;
    },
    set(newValue: any) {
        emits("update", newValue);
    },
});

// watch(()=> select.value, (newValue:any)=> {
//     if(newValue){
//         emits("update", newValue);
//     }
// })
</script>
