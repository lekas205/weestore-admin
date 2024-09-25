<template>
     <v-chip :color="chipColors[statusConverter[status]?.toLowerCase()]">
         <span class="text-capitalize item">{{ statusConverter[status] }} </span>
    </v-chip>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { ORDER_STATUS } from "@/constants/common.ts";


defineProps<{
    status: string
}>()

const statusConverter = ref(ORDER_STATUS)
const chipColors = ref({
    "pending": "yellow",
    "in transit": "orange",
    "processing": "purple",
    "return order": 'red',
    "delivered": "success",
    "completed": 'success',
    "declined": "primary"
})
</script>

<style lang="scss" scoped>
.v-chip{
    &__content{
        span{
            display: block;
            font-weight: bold !important;
        }
    }

    &.text-{
        &yellow {
            .v-chip__content{
                .item{
                    color: #D7B166;
                }
            }
            background: #FEF9C3 !important;
        }
        &purple {
            .v-chip__content{
                .item{
                    color: #6892F6;
                }
            }
            background: #6892F642 !important;
        }

        &purple {
            .v-chip__content{
                .item{
                    color: #6892F6;
                }
            }
            background: #6892F642 !important;
        }

        &orange {
            .v-chip__content{
                .item{
                    color: #ED671B;
                }
            }
            background: #FA712442 !important;
        }
    }
}
</style>

