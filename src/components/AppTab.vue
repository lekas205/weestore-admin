<template>
     <v-card elevation="0" class="px-8">
        <v-tabs 
            color="dark accent-4"
            v-model="tab"
        >
            <v-tab
                v-for="title in tabTitles"
                :key="title"
            >
                {{ title }}
            </v-tab>
        </v-tabs>

        <v-tabs-window  v-model="tab">
            <v-tabs-window-item
                :value="n"
                v-for="n in tabTitles" 
                :key="n + '1'"
            >
                <slot :name="n.toLowerCase().replaceAll(' ', '_')" />
            </v-tabs-window-item>
        </v-tabs-window>
    </v-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps<{
    tabTitles: any[]
}>()

const tab = ref('')
</script>
