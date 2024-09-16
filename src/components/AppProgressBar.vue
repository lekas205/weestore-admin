<template>
    <section>
        <div class="tw-flex tw-justify-between">
            <p> {{ label }} </p>
            <p :class="`tw-text-[${color}]`"> {{value}} % </p>
        </div>
        <v-progress-linear
            height="11"
            v-model="progressCalue"
            :color="color || 'primary'"
        ></v-progress-linear>
    </section>
</template>

<script lang="ts" setup>
import { computed } from "vue"

const props = defineProps<{
    value: number,
    color: string,
    label: string
}>()

const emits = defineEmits<{
    (e: "update:value", val: number):void
}>()

const progressCalue = computed(()=> props.value)
</script>