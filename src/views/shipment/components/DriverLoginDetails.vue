<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="400px">
        <v-card class="px-4 py-7">
          <div class="title-container">
            <div class="text-center mt-6">
              <p class="tw-text-2xl mb-7 tw-font-medium">Account Created</p>
              <p>Copy Login Details Below</p>
            </div>
          </div>
          <div class="pa-5">
            <form class="create-form">
              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Phone Number
                </label>
                <AppInput
                  v-model:value="formData.phone"
                  id="warehouse-name"
                  label="Enter first name"
                  type="text"
                  readonly
                />
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Pin
                </label>
                <AppInput
                  v-model:value="formData.pin"
                  id="warehouse-name"
                  label="Enter Last name"
                  type="text"
                  readonly
                />
                <v-btn  color="primary" @click="copy"  type="button" class="mt-2">
                  Copy
                </v-btn>
              </div>


              <div class="btn-container">  
                <AppButton @click="closeModal()"  type="button">
                  Done
                </AppButton>
              </div>
            </form>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { openToastNotification  } from '@/utils'

  // ============ COMPONENTS =================== //
  import AppInput from '@/components/AppInput.vue'
  import AppButton from '@/components/AppButton.vue'
  
  const emit = defineEmits(['close']);
  const props = defineProps({
    data: {
        type: Object,
        default:()=>{
            return {}
        }
    },
    openModal: {
      type: Boolean,
      default: false,
    }
  });

  const formData = ref({
    pin: "",
    phone: ""
  })
  
  function closeModal() {
    emit('close');
  }

  const copy = () => {
    navigator.clipboard.writeText(`phone number: ${formData.value.phone} pin: ${formData.value.pin}`);
    openToastNotification({
        message: 'Driver login details has been copy=ied to clipboard',
        variant: 'success'
    })
  }

  watch(()=> props.openModal, (newval:boolean)=>{
    if(newval){
        formData.value.pin = props.data.pin
        formData.value.phone = props.data.phoneNumber
    }
  })
  
  </script>
  
  <style scoped>
  .title-container {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 5rem;
  }
  </style>
  