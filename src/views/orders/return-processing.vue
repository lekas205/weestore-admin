<template>
    <section class="px-4 mt-5">
        <v-btn color="primary" @click="$router.back()" class="mb-5"> <ChevronLeft/> Back </v-btn>
        <process-return-tab />
    </section>
</template>

<script lang="ts" setup>
import { ChevronLeft } from 'lucide-vue-next'
import ProcessReturnTab from "./components/ProcessReturn.vue";
</script>
