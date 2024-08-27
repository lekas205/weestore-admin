<template>
  <div class="table-container">
    <div class="table-top">
      <div class="search-container">
        <div class="search-input">
          <input
            :placeholder="searchLabel"
            type="text"
          />
        </div>
        <button class="table-btn search-btn">
          Search
        </button>
      </div>
      <div class="action-container">
        <button class="table-btn red-btn mr-2">
          <Trash2 class="mr-2" />
          Delete
        </button>
        <button class="table-btn green-btn" @click="$emit('newItem')">
          <Plus class="mr-2" />
          {{ createText }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Trash2, Plus } from 'lucide-vue-next'

const props = defineProps({
  searchLabel: {
    type: String,
    default: ''
  },
  createText: {
    type: String,
    required: true
  }
})

</script>

<style lang="scss" scoped>
.table-container {
  margin-top: 3rem;
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

.table-btn {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-right: 1rem;
  padding-left: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.search-btn {
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.26);
}

.red-btn {
  background-color: #FE0000;
  color: white;
  border: none;
}

.green-btn {
  background-color: rgba(29, 207, 36, 0.88);
  color: white;
  border: none;
}
</style>