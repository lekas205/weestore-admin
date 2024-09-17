<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="tw-cursor-pointer" color="red" @click="closeModal()" />
          <div class="title">
            <p class="tw-text-3xl tw-font-medium">Edit Category</p>
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
            <div class="mb-5">
              <label for="app-images" class="tw-text-lg tw-font-medium">
                Category Image
              </label>
              
              <AppFileUpload
                :disabled="isLoading"
                :startUpload="startFileUpload"
                :existingImages="formData.icon.value"
                @savedFile="handleSavedFile"
                @fileError="handleFileError"
                @upload-completed="handleFileUploadSuccess"
              />
              <p class="error-text">{{ formData.icon.errorMessage }}</p>
            </div>
            <div class="btn-container">
              <AppButton
                class="mr-3" type="button"
                :loading="isLoading"
                :disabled="isLoading"
                @click="validateFormData(undefined, true)"
              >
                Edit Category
              </AppButton>

              <AppButton type="button" @click="closeModal" :disabled="isLoading">
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
import { ref, watch, computed, } from 'vue'
import { X } from 'lucide-vue-next'
import { openToastNotification, formValidator } from '@/utils'
import { CustomFormData, UpdateCategoryDto, } from '@/types'
import { UpdateCategorySchema } from '@/schemas'
import { useCategoryStore } from '@/stores'

// ============== COMPONENTS ============== //
import AppInput from '@/components/AppInput.vue'
import AppFileUpload from '@/components/AppFileUpload.vue'
import AppButton from '@/components/AppButton.vue'

// ================== DATA ==================== //
interface Props {
  openModal: boolean;
}

const emit = defineEmits(['close', 'completed']);
const props = withDefaults(defineProps<Props>(),
  {
    openModal: false,
  }
);

const categoryStore = useCategoryStore();
const isLoading = ref<boolean>(false);
const startFileUpload = ref(false);
const editCategoryPayload = ref<UpdateCategoryDto>({} as UpdateCategoryDto);
const formData = ref<CustomFormData>({
  id: {
    value: null,
    errorMessage: null,
  },
  name: {
    value: null,
    errorMessage: null,
  },
  description: {
    value: null,
    errorMessage: null,
  },
  icon: {
    value: [],
    errorMessage: null,
  },
});

const data = computed(() => categoryStore.selectedCategory);

watch(data, (newValue) => {
  formData.value.id.value = newValue.category_id;
  formData.value.name.value = newValue.category_name;
  formData.value.description.value = newValue.description;
  formData.value.icon.value = [newValue.icon];
},
{ deep: true });

//================ METHODS ================//
function clearFormData() {
  formData.value = {
    id: {
      value: null,
      errorMessage: null,
    },
    name: {
      value: null,
      errorMessage: null,
    },
    description: {
      value: null,
      errorMessage: null,
    },
    icon: {
      value: [],
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

  editCategoryPayload.value.icon = urls[0];
  editCategory(editCategoryPayload.value);
}

async function validateFormData(field?: keyof UpdateCategoryDto, proceedOnSuccess = false) {
  const payload = await formValidator<UpdateCategoryDto>(formData, UpdateCategorySchema, field);
  if (payload && proceedOnSuccess) {
    isLoading.value = true;
    editCategoryPayload.value = payload;
    startFileUpload.value = true;
  }
}

async function editCategory(payload: UpdateCategoryDto) {
  try {
    const success = await categoryStore.updateCategory(
      {
        name: payload.name,
        description: payload.description,
        icon: payload.icon
      },
      payload.id
    );

    if (!success) {
      emit('completed');
      clearFormData();
      isLoading.value = false;
      openToastNotification({
        message: 'Category Edited Successfully'
      });
    };
    
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
