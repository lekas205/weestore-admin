<template>
  <div>
    <v-row class="tw-justify-evenly">
      <v-col cols="12" md="3">
        <div class="product-summary card-blue">
          <p class="mb-2">
            Quantity In Stock
          </p>
          <p class="tw-text-xl tw-font-medium">
            {{ $formatAsMoney(quantityInStock, false) }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="product-summary card-brown">
          <p class="mb-2">
            Quantity Out Of Stock
          </p>
          <p class="tw-text-xl tw-font-medium">
            {{ $formatAsMoney(quantityOutOfStock, false) }}
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row class="tw-justify-between mt-n8">
      <v-col cols="12" md="3">
        <div class="product-summary card-red">
          <p class="mb-2">
            Total Sales
          </p>
          <p class="tw-text-xl tw-font-medium">
            {{ $formatAsMoney(totalSales, false) }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="product-summary card-red">
          <p class="mb-2">
            Value Of Quantity In Stock
          </p>
          <p class="tw-text-xl tw-font-medium">
            {{ $formatAsMoney(valueOfQtyInStock) }}
          </p>
        </div>
      </v-col>
      <v-col cols="12" md="3">
        <div class="product-summary card-red">
          <p class="mb-2">
            Quantity Out Of Stock {{ $refs }}
          </p>
          <p class="tw-text-xl tw-font-medium">
            {{ $formatAsMoney(quantityOutOfStock) }}
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">

defineProps({
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
