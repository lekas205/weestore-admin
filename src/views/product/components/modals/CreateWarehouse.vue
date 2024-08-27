<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="tw-cursor-pointer" color="red" @click="closeModal" />
          <div class="title">
            <p class="tw-text-3xl tw-font-medium">Create Warehouse</p>
          </div>
        </div>
        <div class="pa-5">
          <form class="create-form" @submit.prevent="handleFormSubmit">
            <div class="mb-5">
              <label for="warehouse-name" class="input-label">Name of Warehouse</label>
              <AppInput id="warehouse-name" label="Name of Warehouse" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="state-name" class="input-label">State</label>
              <AppInput id="state-name" label="State" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="manager-name" class="input-label">Warehouse Manager</label>
              <AppInput id="manager-name" label="Manager Name" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="phone-number" class="input-label">Warehouse Manager Phone Number</label>
              <AppInput id="phone-number" label="Phone Number" type="text" :disabled="isLoading" />
            </div>
            <div class="mb-5">
              <label for="address" class="input-label">Warehouse Address</label>
              <AppInput id="address" label="Address" type="text" :disabled="isLoading" />
            </div>
            <div class="btn-container">
              <AppButton class="mr-3" type="submit" :loading="isLoading" :disabled="isLoading">
                Create
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
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['close']);
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  }
});
const isLoading = ref<boolean>(false);

function closeModal() {
  if (isLoading.value === true) return;
  emit('close');
}

function handleFormSubmit() {
  // isLoading.value = true;
  closeModal();
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
  font-size: 1.2rem;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5rem;
}
</style>
