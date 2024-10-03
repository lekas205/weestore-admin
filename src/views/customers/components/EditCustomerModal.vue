<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
        <v-card class="px-4 py-7">
          <div class="title-container">
            <X class="tw-cursor-pointer" color="red" @click="closeModal()" />
            <div class="title">
              <p class="tw-text-3xl tw-font-medium">Edit Customer</p>
            </div>
          </div>
          <div class="pa-5">
            <form class="create-form">
              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Fist Name
                </label>
                <AppInput
                  v-model:value="formData.firstName"
                  id="warehouse-name"
                  label="Enter first name"
                  type="text"
                />
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Last Name
                </label>
                <AppInput
                  v-model:value="formData.lastName"
                  id="warehouse-name"
                  label="Enter last name"
                  type="text"
                />
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Phone Number
                </label>
                <AppInput
                  v-model:value="formData.phoneNo"
                  id="warehouse-name"
                  label="Enter Address"
                  type="number"
                />
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Address
                </label>
                <AppInput
                  v-model:value="formData.address"
                  id="warehouse-name"
                  label="Enter Address"
                  type="text"
                />
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  State
                </label>
                <v-select
                    v-model="formData.state"
                    :items="stateList"
                    variant="outlined"
                    density="compact"
                    item-title="name"
                    item-value="code"
                    label="Select"
                    persistent-hint
                    single-line
                    hide-details
                ></v-select>
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Warehose
                </label>
                <v-select
                    v-model="formData.warehouse"
                    :items="warehouseList"
                    variant="outlined"
                    density="compact"
                    item-title="warehouse_name"
                    item-value="warehouse_id"
                    label="Select"
                    persistent-hint
                    single-line
                    hide-details
                ></v-select>
              </div>

              <div class="btn-container">
                <AppButton
                  class="mr-3"
                  type="button"
                  :loading="loading"
                  :disabled="loading"
                  @click="update"
                >
                  Update
                </AppButton>
  
                <AppButton @click="closeModal()" secondary type="button"  :disabled="loading">
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
  import { useRoute } from "vue-router";
  import { ref, computed, onMounted, watch } from 'vue'
  import { X } from 'lucide-vue-next'
  import { openToastNotification, formValidator,  } from '@/utils'
  import { CustomFormData, CreateWarehouseDto } from '@/types'
  import { CreateWarehouseSchema } from '@/schemas'
  import { useWarehouseStore, useCustomersStore } from '@/stores'
  
  // ============ COMPONENTS =================== //
  import AppSelect from "@/components/AppSelect.vue";
  import AppInput from '@/components/AppInput.vue'
  import AppButton from '@/components/AppButton.vue'
  
  const emit = defineEmits(['close', 'completed']);
  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
    details: {
      type: Object,
      default: ()=>{
        return {}
      },
    }
  });
  
  const route = useRoute();
  const customerStore = useCustomersStore();
  const warehouseStore = useWarehouseStore();

  const loading = ref<boolean>(false);
  const formData = ref<any>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    state: "",
    address: "",
    warehouse: "",
  });
  
  const stateList = computed(() => warehouseStore.states ?? []);
  const warehouseList = computed(() => warehouseStore.warehouseData.rows ?? []);
  
  function closeModal() {
    if (loading.value === true) return;
    emit('close');
  }

  const updateWarehouse = (value?: any) => {
    formData.value.warehouse_id = value
  }

  watch( () => props.openModal, (newval)=>{
    if(newval){
        formData.value.firstName = props.details.first_name;
        formData.value.lastName = props.details.last_name;
        formData.value.email  = props.details.email;
        formData.value.phoneNo = props.details.phone;
        formData.value.warehouse = props.details.warehouse_id;
        formData.value.state = props.details.state_code;
        formData.value.address = props.details.address;
    }
  })

  const update = async () => {
    loading.value = true
    const res =  await customerStore.updateCustomer({
        payload: formData.value,
        customerId: props.details.customer_id,
    })
    await customerStore.getSingleCustomer(route.params.id as string)

    loading.value = false
    if(res){
        openToastNotification({
          message: "Customer's profile has been update successfully",
          variant: 'success'
        });
        emit("completed")
    }
    closeModal()

  }

  onMounted(async()=>{
    warehouseStore.fetchAllWarehouses()
    warehouseStore.fetchStates()
  })
  
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
    margin-top: 3rem;
  }
  </style>
  