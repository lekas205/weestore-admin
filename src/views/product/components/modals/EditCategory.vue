<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="tw-cursor-pointer" color="red" @click="closeModal" />
          <div class="title">
            <p class="tw-text-3xl tw-font-medium">Edit Category</p>
          </div>
        </div>
        <div class="pa-5">
          <form class="create-form" @submit.prevent="handleFormSubmit">
            <div class="mb-5">
              <label for="category-name" class="input-label">Name of Category</label>
              <AppInput id="category-name" label="Name of Category" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="description" class="input-label">Description</label>
              <AppInput id="description" label="Description" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="app-images" class="input-label">Category Image</label>
              <AppFileUpload
                :startUpload="startFileUpload"
                @uploadFailed="handleFileUploadFailed"
                @uploaded="createCategory"
              />
            </div>
            <div class="btn-container">
              <AppButton class="mr-3" type="submit" :loading="isLoading" :disabled="isLoading">
                Add Category
              </AppButton>

              <AppButton @click="closeModal" :disabled="isLoading">
                Cancel
              </AppButton>
            </div>
          </form>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import { X } from 'lucide-vue-next'
import AppInput from '@/components/AppInput.vue'
import AppFileUpload from '@/components/AppFileUpload.vue'
import AppButton from '@/components/AppButton.vue'
import { openToastNotification } from '@/utils'

const emit = defineEmits(['close',]);

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  }
});

const isLoading = ref<boolean>(false);
const startFileUpload = ref<boolean>(false);

function closeModal() {
  if (isLoading.value === true) return;
  emit('close');
}

function handleFormSubmit() {
  isLoading.value = true;
  startFileUpload.value = true;
  // closeModal();
}

function handleFileUploadFailed() {
  isLoading.value = false;
  startFileUpload.value = false;
}

function createCategory(images: string[]) {
  isLoading.value = false;
  startFileUpload.value = false;
  console.log(images)
}

</script>

<style scoped>
.title-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.title {
  flex-grow: 1;
  display: flex;
  justify-content: center;
}


.input-label {
  font-weight: 500;
  font-size: 1.5rem;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
}
</style>
