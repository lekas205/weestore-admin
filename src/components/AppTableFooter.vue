<template>
  <div class="table-footer-wrapper">
    <div class="tw-flex tw-items-center">
      <p>
        Showing {{ currentPage }} of {{ totalNoPages }}
      </p>
    </div>
    <div>
      <v-pagination
        v-model="currentPage"
        :length="totalNoPages"
        :total-visible="5"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true,
  },
  currentPageTotal: {
    type: Number,
    required: true,
  },
  currentPageNo: {
    type: Number,
    required: true,
  },
  totalNoPages: {
    type: Number,
    required: true,
  },
})

const currentPage = computed(() => {
  return props.currentPageNo;
})

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