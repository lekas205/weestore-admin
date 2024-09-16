<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="tw-cursor-pointer" color="red" @click="closeModal()" />
          <div class="title">
            <p class="tw-text-3xl tw-font-medium">Create Warehouse</p>
          </div>
        </div>
        <div class="pa-5">
          <form class="create-form">
            <div class="mb-5">
              <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                Name of Warehouse
              </label>
              <AppInput
                 v-model="formData.name.value"
                id="warehouse-name"
                label="Name of Warehouse"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('name')"
                @input="validateFormData('name')"
              />
              <p class="error-text">{{ formData.name.errorMessage }}</p>
            </div>
            <div class="mb-5">
              <label for="manager-name" class="tw-text-lg tw-font-medium">
                Warehouse Manager
              </label>
              <AppInput
                v-model="formData.managerName.value"
                id="manager-name"
                label="Manager Name"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('managerName')"
                @input="validateFormData('managerName')"
              />
              <p class="error-text">{{ formData.managerName.errorMessage }}</p>
            </div>
            <div class="mb-5">
              <label for="phone-number" class="input-label">
                Warehouse Manager Phone Number
              </label>
              <AppInput
                v-model="formData.managerPhoneNo.value"
                id="phone-number"
                label="Phone Number"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('managerPhoneNo')"
                @input="validateFormData('managerPhoneNo')"
              />
              <p class="error-text">{{ formData.managerPhoneNo.errorMessage }}</p>
            </div>
            <div class="mb-5">
              <label for="address" class="input-label">
                Warehouse Address
              </label>
              <AppInput
                v-model="formData.address.value"
                id="address"
                label="Address"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('address')"
                @input="validateFormData('address')"
              />
              <p class="error-text">{{ formData.address.errorMessage }}</p>
            </div>
            <div class="mb-5">
              <label for="state-name" class="input-label">State</label>
              <div class="product-select">
                <v-combobox
                  v-model="formData.state_id.value"
                  item-title="name"
                  item-value="code"
                  variant="outlined"
                  :return-object="false"
                  :items="states"
                  :disabled="isLoading"
                  @update:model-value="validateStateId"
                ></v-combobox>
              </div>
              <p class="error-text">{{ formData.state_id.errorMessage }}</p>
            </div>
            <div class="btn-container">
              <AppButton
                class="mr-3"
                type="button"
                :loading="isLoading"
                :disabled="isLoading"
                @click.prevent="validateFormData(undefined, true)"
              >
                Create
              </AppButton>

              <AppButton @click="closeModal()" type="button"  :disabled="isLoading">
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
import { ref, computed } from 'vue'
import { X } from 'lucide-vue-next'
import { openToastNotification, formValidator,  } from '@/utils'
import { CustomFormData, CreateWarehouseDto } from '@/types'
import { CreateWarehouseSchema } from '@/schemas'
import { useWarehouseStore } from '@/stores'

// ============ COMPONENTS =================== //
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['close', 'completed']);
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  }
});

const warehouseStore = useWarehouseStore();
const isLoading = ref<boolean>(false);
const formData = ref<CustomFormData>({
  name: {
    value: null,
    errorMessage: null,
  },
  managerName: {
    value: null,
    errorMessage: null,
  },
  managerPhoneNo: {
    value: null,
    errorMessage: null,
  },
  state_id: {
    value: null,
    errorMessage: null,
  },
  address: {
    value: null,
    errorMessage: null,
  }
});

const states = computed(() => warehouseStore.states);

// ============= METHODS =================== //
function clearFormData() {
  formData.value = {
    name: {
      value: null,
      errorMessage: null,
    },
    managerName: {
      value: null,
      errorMessage: null,
    },
    managerPhoneNo: {
      value: null,
      errorMessage: null,
    },
    state_id: {
      value: null,
      errorMessage: null,
    },
    address: {
      value: null,
      errorMessage: null,
    }
  }
}

function closeModal() {
  if (isLoading.value === true) return;
  clearFormData();
  emit('close');
}

function validateStateId(code: string) {
  if (states.value.findIndex((i: any) => i.code == code) >= 0) {
    formData.value.state_id.errorMessage = null;
  }
  else {
    formData.value.state_id.errorMessage = 'State is required';
    formData.value.state_id.value = null;
  }
}

async function validateFormData(field?: keyof CreateWarehouseDto, proceedOnSuccess = false) {
  const payload = await formValidator<CreateWarehouseDto>(formData, CreateWarehouseSchema, field);
  if (payload && proceedOnSuccess) {
    createWarehouse(payload);
  }
}

async function createWarehouse(payload: CreateWarehouseDto) {
  isLoading.value = true;
  try {
    const success = await warehouseStore.createWarehouse(payload);
    if (success) {
      emit('completed');
      clearFormData();
      isLoading.value = false;
      openToastNotification({
        message: 'Warehouse Created Successfully'
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
