<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="cursor-pointer" color="red" @click="closeModal()" />
          <div class="title">
            <p class="tw-text-3xl tw-font-medium">Add Category</p>
          </div>
        </div>
        <div class="pa-5">
          <form class="create-form">
            <div class="mb-5">
              <label for="category-name" class="tw-text-lg tw-font-medium">
                Name of Category
              </label>
              <AppInput
                v-model:value="formData.name.value"
                id="category-name"
                label="Name of Category"
                :disabled="isLoading"
                @blur="validateFormData('name')"
                @input="validateFormData('name')"
              />
              <p class="error-text">{{ formData.name.errorMessage }}</p>
            </div>
            <div class="mb-5">
              <label for="description" class="tw-text-lg tw-font-medium">
                Description
              </label>
              <AppInput
                v-model:value="formData.description.value"
                id="description"
                label="Description"
                :disabled="isLoading"
                @blur="validateFormData('description')"
                @input="validateFormData('description')"
              />
              <p class="error-text">{{ formData.description.errorMessage }}</p>
            </div>
            <!-- <div class="mb-5">
              <label for="app-images" class="tw-text-lg tw-font-medium">
                Category Image
              </label>
              <AppFileUpload
                :disabled="isLoading"
                :startUpload="startFileUpload"
                @savedFile="handleSavedFile"
                @fileError="handleFileError"
                @upload-completed="handleFileUploadSuccess"
              />
              <p class="error-text">{{ formData.icon.errorMessage }}</p>
            </div> -->
            <div class="btn-container">
              <AppButton
                class="mr-3"
                type="button"
                :loading="isLoading"
                :disabled="isLoading"
                @click.prevent="validateFormData(undefined, true)"
              >
                Add Category
              </AppButton>

              <AppButton type="button" :disabled="isLoading" @click="closeModal()">
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
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { openToastNotification, formValidator } from '@/utils'
import { CustomFormData, CreateCategoryDto } from '@/types'
import { CreateCategorySchema } from '@/schemas'
import { useCategoryStore } from '@/stores'

// ============== COMPONENTS ============== //
import AppInput from '@/components/AppInput.vue'
import AppFileUpload from '@/components/AppFileUpload.vue'
import AppButton from '@/components/AppButton.vue'

// ================== DATA =============== //
const emit = defineEmits(['close', 'completed']);
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  }
});

const categoryStore = useCategoryStore();
const isLoading = ref<boolean>(false);
const startFileUpload = ref(false);
const createCategoryPayload = ref<CreateCategoryDto>({} as CreateCategoryDto);
const formData = ref<CustomFormData>({
  name: {
    value: null,
    errorMessage: null,
  },
  description: {
    value: null,
    errorMessage: null,
  },

});

// =============== METHODS ============== //
function clearFormData() {
  formData.value = {
    name: {
      value: null,
      errorMessage: null,
    },
    description: {
      value: null,
      errorMessage: null,
    },
  }
}

function closeModal() {
  if (isLoading.value === true) return;
  clearFormData();
  emit('close');
}

function handleSavedFile(files: Array<File | string>) {
  formData.value.icon.value = [...files];
}

function handleFileError(message: string | null) {
  formData.value.icon.errorMessage = message;
}

function handleFileUploadSuccess(urls: Array<string> | null) {
  startFileUpload.value = false;
  if (!urls) {
    isLoading.value = false;
    return;
  }
  const payload = {
    ...createCategoryPayload.value,
    icon: urls[0],
  }

  createCategory(payload);
}

async function validateFormData(field?: keyof CreateCategoryDto, proceedOnSuccess = false) {
  const payload = await formValidator<CreateCategoryDto>(formData, CreateCategorySchema, field);
  if (payload && proceedOnSuccess) {
    isLoading.value = true;
    createCategoryPayload.value = payload;
    // startFileUpload.value = true;

    createCategory(payload);
  }
}

async function createCategory(payload: CreateCategoryDto) {
  try {
    
    const success = await categoryStore.createCategory(payload);
    if (success) {
      emit('completed');
      clearFormData();
      isLoading.value = false;
      openToastNotification({
        message: 'Category Created Successfully'
      });
    }
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
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

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
}
</style>
