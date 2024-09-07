<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="65vw">
        <v-card class="px-4 py-7">
          <div class="title-container">
            <div class="title tw-flex tw-gap-[50px] tw-justify-center mt-5">
              <p 
                @click="returnType= 'half' "
                class="tw-font-[700] tw-text-[20px] tw-text-[#A5A1A8] tw-cursor-pointer" 
                :class="{'tw-underline tw-text-[#000000]': returnType === 'half'}"
             >Half return </p>
                <p 
                    @click="returnType= 'full' "
                    class="tw-font-[700] tw-text-[20px] tw-text-[#A5A1A8] tw-cursor-pointer" 
                    :class="{'tw-underline tw-text-[#000000]': returnType === 'full'}"
                >Full Return</p>
            </div>
  
            <div class="title-tab">
              <p class="text-red tw-text-lg">Order Information</p>
            </div>
            <hr>
          </div>
          <div>
            <v-row>
              <v-col cols="12" md="3">
                <p class="tw-text-lg tw-font-medium">Wharehouse</p>
              </v-col>
              <v-col cols="12" md="9">
                <AppInput
                  v-model="formData.name.value"
                  label="Product Name"
                  type="text"
                  :disabled="isLoading"
                  @blur="validateFormData('name')"
                  @input="validateFormData('name')"
                />
                <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="3">
                <p class="tw-text-lg tw-font-medium">Reseller’s Name</p>
              </v-col>
              <v-col cols="12" md="9">
                <AppInput
                  v-model="formData.name.value"
                  label="Reseller’s Name"
                  type="text"
                  :disabled="isLoading"
                  @blur="validateFormData('name')"
                  @input="validateFormData('name')"
                />
                <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
              </v-col>
            </v-row>

            <v-row class="mb-4">
              <v-col cols="12" md="3">
                <p class="tw-text-lg tw-font-medium">Order ID</p>
              </v-col>
              <v-col cols="12" md="9">
                <AppInput
                  v-model="formData.name.value"
                  label="Reseller’s Name"
                  type="text"
                  :disabled="isLoading"
                  @blur="validateFormData('name')"
                  @input="validateFormData('name')"
                />
                <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
              </v-col>
            </v-row>

            <hr/>

            <v-row class="mt-4">
                <v-col cols="12" md="6" v-for="i in 4">
                    <v-row>
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Product Name</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            v-model="formData.name.value"
                            label=""
                            type="text"
                            :disabled="isLoading"
                            @blur="validateFormData('name')"
                            @input="validateFormData('name')"
                            />
                            <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Sales Price</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            v-model="formData.name.value"
                            label=""
                            type="text"
                            :disabled="isLoading"
                            @blur="validateFormData('name')"
                            @input="validateFormData('name')"
                            />
                            <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Quantity in Stock</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            v-model="formData.name.value"
                            label=""
                            type="text"
                            :disabled="isLoading"
                            @blur="validateFormData('name')"
                            @input="validateFormData('name')"
                            />
                            <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                        </v-col>
                    </v-row>
                    <v-row class="mb-3">
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Value of Quantity In Stock</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            v-model="formData.name.value"
                            label=""
                            type="text"
                            :disabled="isLoading"
                            @blur="validateFormData('name')"
                            @input="validateFormData('name')"
                            />
                            <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                        </v-col>
                    </v-row>
                    <hr/>
                </v-col>
            </v-row>
          </div>

          <div class=" mt-4 mb-4">
            <app-button secondary> Edit Invoice </app-button>
          </div>

          <hr>

          <v-row class=" mt-4">
            <v-col cols="12" md="6">
                <v-row class="">
                    <v-col cols="12" md="5">
                        <p class="tw-text-lg tw-font-medium">Total Amount Paid</p>
                    </v-col>
                    <v-col cols="12" md="7">
                        <AppInput
                        v-model="formData.name.value"
                        label=""
                        type="text"
                        :disabled="isLoading"
                        @blur="validateFormData('name')"
                        @input="validateFormData('name')"
                        />
                        <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="6">
                <v-row class="">
                    <v-col cols="12" md="4">
                        <p class="tw-text-lg tw-font-medium">Amount to Return</p>
                    </v-col>
                    <v-col cols="12" md="8">
                        <AppInput
                        v-model="formData.name.value"
                        label=""
                        type="text"
                        :disabled="isLoading"
                        @blur="validateFormData('name')"
                        @input="validateFormData('name')"
                        />
                        <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                    </v-col>
                </v-row>
            </v-col>
          </v-row>

          <v-row class="">
            <v-col cols="12" md="6">
                <v-row class="">
                    <v-col cols="12" md="5">
                        <p class="tw-text-lg tw-font-medium">Total Amount Paid</p>
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-textarea
                            v-model="formData.description.value"
                            variant="outlined"
                            :disabled="isLoading"
                            @blur="validateFormData('description')"
                            @input="validateFormData('description')"
                        ></v-textarea>
                        <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12" md="6">
                <v-row class="">
                    <v-col cols="12" md="4">
                        <p class="tw-text-lg tw-font-medium">Amount to Retain</p>
                    </v-col>
                    <v-col cols="12" md="8">
                        <AppInput
                        v-model="formData.name.value"
                        label=""
                        type="text"
                        :disabled="isLoading"
                        @blur="validateFormData('name')"
                        @input="validateFormData('name')"
                        />
                        <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                    </v-col>
                </v-row>
            </v-col>
          </v-row>

          <div class="btn-container">
            <v-btn  @click="closeModal" size="large" :disabled="isLoading" variant="text" color="primary">
              Cancel
            </v-btn>
            <AppButton @click="validateFormData(undefined, true)" class="mr-3" type="submit" :loading="isLoading" :disabled="isLoading">
              {{ status === 'request' ?" Submit request": "Approve"}}
            </AppButton>
  

          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import AppInput from '@/components/AppInput.vue'
  import AppButton from '@/components/AppButton.vue'
  import AppFileUpload from '@/components/AppFileUpload.vue'
  import { CustomFormData, CreateProductDto, Category, IState } from '@/types'
  import { formValidator, handleFileUpload, openToastNotification } from '@/utils'
  import { CreateProductSchema } from '@/schemas'
  import { useWarehouseStore, useProductStore } from '@/stores'
  
  const emit = defineEmits(['close']);
  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
    status: {
        type: String,
        default: "request",
        description: "options are request and approval "
    },
    categories: {
      type: Array,
      default() {
        const data: Array<Category> = [];
        return data;
      },
    },
    states: {
      type: Array,
      default() {
        const data: Array<IState> = [];
        return data;
      },
    },
  });
  
  const warehouseStore = useWarehouseStore();
  const productStore = useProductStore();
  const isLoading = ref<boolean>(false);
  const loadingWarehouse = ref(false);
  const productSizes = ['S', 'M', 'L', 'XL', 'XXL', 'NIL'];
  const warehouses = ref<any[]>([]);
  let imageFiles: Array<File> = [];
  const returnType = ref('half')
  
  const formData = ref<CustomFormData>({
    name: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    description: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    images: {
      value: [],
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = [];
      },
    },
    sizes: {
      value: [],
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = [];
      },
    },
    price: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    quantity: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    state: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    warehouse: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    manufacturer: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
    category: {
      value: null,
      errorMessage: null,
      clear: function() {
        this.errorMessage = null;
        this.value = null;
      },
    },
  });
  
  function closeModal() {
    if (isLoading.value === true) return;
    for (const key in formData.value) {
      if (Object.prototype.hasOwnProperty.call(formData.value, key)) {
        if (formData.value[key].clear) {
          formData.value[key].clear();
        }
      }
    }
    emit('close');
  }
  
  function updateSize(value: string) {
    if (isLoading.value === true) return;
    const existingIdx = formData.value.sizes.value.indexOf(value);
  
    if (existingIdx < 0) {
      formData.value.sizes.value.push(value);
    }
    else {
      formData.value.sizes.value.splice(existingIdx, 1);
    }
  
    if(formData.value.sizes.value.length > 0) {
      formData.value.sizes.errorMessage = null;
    }
  }
  
  function handleSavedFile(files: File[]) {
    if (isLoading.value === true) return;
    formData.value.images.value = files;
    // TODO: check proxy Array
    if (files.length  >= 1) {
      formData.value.images.errorMessage = null;
    }
  }
  
  async function handleStateSelection(stateId: any) {
    await validateFormData('state');
    if (props.states.findIndex((i: any) => i.code == stateId) >= 0) {
      loadingWarehouse.value = true;
      warehouses.value = await warehouseStore.fetchWarehouseByState(stateId);
      loadingWarehouse.value = false;
    }
  }
  
  async function validateFormData(field?: keyof CreateProductDto, proceedOnSuccess = false) {
    const payload = await formValidator<CreateProductDto>(formData, CreateProductSchema, field);
    if (payload && proceedOnSuccess) {
      await createProduct(payload);
    }
  }
  
  async function createProduct(payload: CreateProductDto) {
    isLoading.value = true;
    try {
      payload.price = payload.price.toString() as any;
      payload.quantity = payload.quantity.toString() as any;
      const urls = await handleFileUpload(payload.images);
      if (urls) {
        payload.images = [];
        urls.forEach(url => payload.images.push({ image_url: url }))
      }
  
      const success = await productStore.createProduct(payload);
      if (success) {
        openToastNotification({
          message: 'Product created successfully'
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  
  </script>
  
  <style lang="scss" scoped>
  .title-container {
    margin-bottom: 1rem;
    border-bottom: 1px solid #F8F9FA;
  }
  
  .title {
    margin-bottom: 2rem;
  }
  
  .divider {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  
  .checkbox-wrapper {
    display: flex;
    gap: 1rem;
  
    p {
      text-align: center;
    }
  }
  
  .product-checkbox {
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 2em;
    height: 2em;
    border: 0.15em solid currentColor;
    border-radius: 0.5em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  
  .product-checkbox::before {
    content: "";
    width: 1em;
    height: 1em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--form-control-color);
    background-color: CanvasText;
  }
  
  .product-checkbox:checked::before {
    transform: scale(1);
  }
  
  .product-select {
    max-height: 60px;
  }
  
  .btn-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 5rem;
  }
  </style>
  