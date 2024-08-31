<template>
  <div class="table-footer-wrapper">
    <div class="tw-flex tw-items-center">
      <p>
        Showing 
        {{ pagination.currentPage }}-{{ pagination.currentPage + 3 }} of 
        {{ pagination.totalPages }}
      </p>
    </div>
    <div>
      <v-pagination
        v-model="pagination.currentPage"
        :length="pagination.totalPages"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  totalNoPages: {
    type: Number,
    default: 20,
  },
  perPage: {
    type: Number,
    default: 20,
  },
})

const pagination = ref({
  currentPage: props.page,
  totalPages: props.totalNoPages,
  perPage: props.perPage,
});

</script>

<style lang="scss" scoped>
.table-footer-wrapper {
  display: flex;
  padding-right: 1rem;
  padding-left: 1rem;
  justify-content: space-between;
  border-top: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>