<template>
     <v-chip :color="chipColors[status]">
         <span class="text-capitalize item">{{ status }} </span>
    </v-chip>
</template>

<script lang="ts" setup>
import { ref } from "vue"

defineProps<{
    status: string
}>()

const chipColors = ref({
    "pending": "yellow",
    "in trnasit": "orange",
    "processing": "purple",
    "delivered": "success",
    "cancelled": "primary"
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

