<template>
  <div class="table-container">
    <div class="table-top">
      <div class="search-container">
        <div v-if="searchLabelText" class="search-input">
          <AppInput :label="searchLabelText" v-model="search"/>
        </div>
        <button
          v-if="searchLabelText"
          :disabled="!search.length"
          class="table-btn search-btn"
          @click=" submit"
        >
          Search
        </button>
        <v-btn
          size="large"
          variant="text"
          color="red"
          v-if="searched"
          class="table-btn"
          @click="clear"
        >
          Clear <X/>
        </v-btn>
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

        <button
          v-if="hasDelete"
          class="table-btn red-btn"
          @click="$emit('delete')"
        >
          <Trash2 class="mr-2" />
           Delete
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Trash2 , X} from 'lucide-vue-next'
import AppInput from '@/components/AppInput.vue'

const emit = defineEmits(['create', 'search', 'delete']);

defineProps({
  searchLabelText: {
    type: String,
    required: false,
  },
  hasDelete: {
    type: Boolean,
    default: false
  },
  createBtnText: {
    type: String,
    required: false,
  }
});

const search = ref("");
const searched = ref(false);

const submit = () => {
  searched.value = true;
  emit('search', search.value)
}

const clear = () => {
  searched.value = false;
  search.value = ""
  emit('search', search.value)
}
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