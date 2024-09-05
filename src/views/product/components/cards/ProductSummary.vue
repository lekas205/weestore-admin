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
          title="Total Sales"
          :value="$formatAsMoney(totalSales, false)"
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
          title="Quantity Out Of Stock"
          :value="$formatAsMoney(quantityOutOfStock)"
          type="red"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import StatCard from './ProductStatCard.vue'

const props = defineProps({
  totalSales: {
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
})

</script>

<style lang="scss" scoped></style>
