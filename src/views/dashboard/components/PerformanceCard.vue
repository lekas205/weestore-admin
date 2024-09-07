<template>
    <section class="tw-bg-white tw-rounded-[12px] tw-font-[500] tw-overflow-hidden tw-mt-[20px] performance-card">
        <div v-for="item in performanceStats" class="performance-card__section">
             <h4 > {{ item.label }} </h4>
            <div class="tw-px-[25px]"> 
                <app-progress-bar 
                    class="mb-3"
                    :color="randomColor()"
                    :label="data.name" 
                    v-for="data in item.data"
                    v-model:value="data.percentage" 
                />
            </div>
           
        </div>
    </section>
</template>

<script lang="ts" setup>
import useString from "@/composables/string";
import AppProgressBar from "@/components/AppProgressBar.vue";

const {randomColor } = useString()

const props = defineProps<{
    performanceStats: any[]
}>()
</script>

<style lang="scss" scoped>
    .performance-card{
        &__section{
            &:first-child {
                h4{
                    margin-bottom: 15px;
                    background-color: #DFE0E0;
                }
            }
            &:not(:first-child){
                h4{
                    margin-top: 25px;
                    text-decoration: underline;
                }
            }
            h4{
                font-size: 18px;
                margin-bottom: 10px;
                padding: 4px 25px;
            }
        }
    }
</style>

