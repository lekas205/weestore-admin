<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="600px">
        <v-card class="px-4 py-7">
          <div class="title-container">
            <X class="tw-cursor-pointer" color="red" @click="closeModal()" />
            <div class="title">
              <p class="tw-text-3xl tw-font-medium">Wallet Topup</p>
            </div>
          </div>
          <div class="pa-5">
            <form class="create-form">
              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Customer
                </label>
                <v-select
                    v-model="formData.customerId"
                    :items="customer_list"
                    variant="outlined"
                    density="compact"
                    item-title="name"
                    item-value="value"
                    label="Select"
                    persistent-hint
                    single-line
                    hide-details
                ></v-select>
              </div>

              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Wallet Type
                </label>
                <v-select
                    v-model="formData.productType"
                    :items="walletOptions"
                    variant="outlined"
                    density="compact"
                    label="Select"
                    persistent-hint
                    single-line
                    hide-details
                ></v-select>
              </div>
              <div class="mb-3">
                <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                  Amount
                </label>
                <AppInput
                  v-model:value="formData.amount"
                  id="amount"
                  label="Enter Amount"
                  type="number"
                />
              </div>
              <div class="btn-container">
                <AppButton
                  class="mr-3"
                  type="button"
                  :loading="loading"
                  :disabled="loading"
                  @click="submit"
                >
                 Topup
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
  import { storeToRefs } from "pinia";
  import { ref, computed, onMounted, watch } from 'vue'
  import { X } from 'lucide-vue-next'
  import { openToastNotification, formValidator,  } from '@/utils'
  import { CreateWarehouseSchema } from '@/schemas'
  import { useWarehouseStore, useDriverStore  , useWalletStore, useCustomersStore} from '@/stores'

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
  });
  
  const route = useRoute();
  const driverStore = useDriverStore();
  const warehouseStore = useWarehouseStore();
  const walletStore = useWalletStore()

  const customerStore = useCustomersStore()

  const { customers } = storeToRefs(customerStore);


  const showModal = ref(false);
  const loginData = ref<any>({});
  const loading = ref<boolean>(false);
  const formData = ref<any>({
    amount: '',
    customerId: '',
    productType: '',
  });

  const walletOptions = ref(['Topup', 'Reward'])


  const customer_list = computed(()=> {
    return customers.value.data.map((elm)=>{
     return{
      name: `${elm.first_name} ${elm.last_name}`,
      value : elm.customer_id,
     }
    })
  })
  
  function closeModal() {
    if (loading.value === true) return;
    emit('close');
  }
  
  const submit = async () => {
    loading.value = true
      var res:any;
      res = await walletStore.topupWallet({
        ...formData.value,
        productType: formData.value.productType.toUpperCase(),
      })

    loading.value = false
    if(res){
        openToastNotification({
          message: `Customer's wallet topped up successfully`,
          variant: 'success'
        });
        closeModal()
    }
   
  }

  onMounted(async()=>{
    customerStore.fetchCustomers({limit: 1000})
    // warehouseStore.fetchAllWarehouses()
    // warehouseStore.fetchStates()
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
  