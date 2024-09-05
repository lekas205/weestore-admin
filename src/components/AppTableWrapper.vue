<template>
  <div class="table-container">
    <div class="table-top">
      <div class="search-container">
        <div v-if="searchLabelText" class="search-input">
          <AppInput :label="searchLabelText"/>
        </div>
        <button
          v-if="searchLabelText"
          class="table-btn search-btn"
          @click="$emit('search')"
        >
          Search
        </button>
      </div>
      <div class="action-container">
        <button
          v-if="createBtnText"
          class="table-btn green-btn"
          @click="$emit('create')"
        >
          <Plus class="mr-2" />
          {{ createBtnText }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import AppInput from '@/components/AppInput.vue'

defineEmits(['create', 'search']);

defineProps({
  searchLabelText: {
    type: String,
    required: false,
  },
  createBtnText: {
    type: String,
    required: false,
  }
});
</script>

<style lang="scss" scoped>
.table-top {
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 1.5rem;
  padding: 1rem;
}

.search-container {
  flex: 0 0 40%;
  display: flex;
  align-items: flex-end;
}

.action-container {
  flex: 0 0 40%;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  flex: 0 0 70%;
  margin-right: 1rem;
}
</style>