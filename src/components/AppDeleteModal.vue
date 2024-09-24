<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
        <v-card class="px-4 py-7">
          <div class="wrapper">
            <Trash2 :size="40" class="mb-3" color="red" />
            <h2 class="tw-text-2xl">Are You Sure You Want To Delete?</h2>
            <div class="btn-container">
              <AppButton :disabled="isLoading" secondary class="mr-4" @click="closeModal">
                No, Keep It
              </AppButton>
  
              <AppButton :disabled="isLoading" :loading="isLoading" @click="emit('delete')">
                Yes, Delete It
              </AppButton>
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Trash2 } from 'lucide-vue-next'
  import { openToastNotification } from '@/utils'
  
  import AppButton from '@/components/AppButton.vue'
  
  const emit = defineEmits(['close', 'delete']);
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
  };
  </script>
  
  <style lang="scss" scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    margin-bottom: 5rem;
  }
  
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
  }
  </style>
  