<template>
  <div class="table-footer-wrapper" v-if="totalNoPages">
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
import { computed, watch } from 'vue'
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
  page:{
    type: Number,
    required: true,
  }
})

const emits =defineEmits<{
  (e: "update:page", page: number): void
}>()

const currentPage = computed({
    get() {
        return props.page;
    },
    set(newValue) {
        emits("update:page", newValue);
    },
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