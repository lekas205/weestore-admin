<template>
  <div class="table-container">
    <div class="table-top">
      <div class="search-container">
        <div v-if="searchLabelText" class="search-input">
          <input
            :placeholder="searchLabelText"
            type="text"
          />
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
.table-container {
  // margin-top: 3rem;
  padding: 1rem;
}

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
  border: 1px solid rgba(0, 0, 0, 0.26);
  border-radius: 10px;
  display: flex;
  padding: 0.5rem;
  flex: 0 0 70%;
  margin-right: 1rem;

  input {
    max-width: 100%;
    width: 100%;
  }

  input:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
}
</style>