<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="500px">
        <v-card class="tw-px-[40px] pt-4 "> 
            <X class="tw-cursor-pointer self-end" color="red" @click="closeModal()" />
          <div class="wrapper ">
            <MapPin  :size="40"/>
            <h2 class="tw-text-2xl text-center mb-3 mt-2"> Delivery Address </h2>
            <p>{{ address }}</p>
            <div class="btn-container">
            </div>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { X, MapPin } from 'lucide-vue-next'
  import { openToastNotification } from '@/utils'
  
  import AppButton from '@/components/AppButton.vue'
  
  const emit = defineEmits(['close', 'proceed']);
  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      required: true,
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
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
  }
  </style>
  