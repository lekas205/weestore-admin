<template>
  <div>
    <v-row class="tw-justify-evenly">
      <v-col cols="12" md="3">
        <StatCard
          title="Quantity In Stock"
          :value="$formatAsMoney(quantityInStock, false)"
          type="blue"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="Quantity Out Of Stock"
          :value="$formatAsMoney(quantityOutOfStock, false)"
          type="brown"
        />
      </v-col>
    </v-row>
    <v-row class="tw-justify-between mt-n8">
      <v-col cols="12" md="3">
        <StatCard
          title="Total Products"
          :value="$formatAsMoney(totalProduts, false)"
          type="red"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="Value Of Quantity In Stock"
          :value="$formatAsMoney(valueOfQtyInStock)"
          type="red"
        />
      </v-col>
      <v-col cols="12" md="3">
        <StatCard
          title="Value of Qty out stock"
          :value="$formatAsMoney(valueOfQtyOutStock)"
          type="red"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import StatCard from './ProductStatCard.vue'

const props = defineProps({
  totalProduts: {
    type: Number,
    required: true,
  },
  valueOfQtyInStock: {
    type: Number,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  quantityOutOfStock: {
    type: Number,
    required: true,
  },
  valueOfQtyOutStock: {
    type: Number,
    required: true,
  },
})

</script>

<style lang="scss" scoped></style>
