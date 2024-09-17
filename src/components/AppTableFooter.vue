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
        @update:modelValue="$emit('next', $event)"
      ></v-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

defineEmits(['next']);

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
    required: false,
  }
})

const currentPage = ref(props.currentPageNo);

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