<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="60vw">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <div class="title">
            <p class="tw-text-3xl tw-font-semibold">Add Product</p>
          </div>

          <div class="title-tab">
            <p class="text-red tw-text-lg">Basic Info</p>
          </div>
          <hr>
        </div>
        <div>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Product Name</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.name.value"
                label="Product Name"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('name')"
                @input="validateFormData('name')"
              />
              <p class="error-text">{{ formData.name.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Product Description</p>
            </v-col>
            <v-col cols="12" md="9">
              <v-textarea
                v-model="formData.description.value"
                variant="outlined"
                :disabled="isLoading"
                @blur="validateFormData('description')"
                @input="validateFormData('description')"
              ></v-textarea>
              <p class="error-text">{{ formData.description.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Product Images</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppFileUpload
                allowMultipleFiles
                :disabled="isLoading"
                :startUpload="startFileUpload"
                @savedFile="handleSavedFile"
                @fileError="handleFileError"
                @upload-completed="handleFileUploadSuccess"
              />
              <p class="error-text">{{ formData.images.errorMessage }}</p>
            </v-col>
          </v-row>
          <hr class="divider">
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Select Sizes</p>
            </v-col>
            <v-col cols="12" md="9">
              <div class="checkbox-wrapper">
                <div v-for="(size, idx) in productSizes" :key="idx">
                  <input
                    @input="updateSize(size)"
                    class="product-checkbox"
                    type="checkbox"
                    name="size-checkbox"
                    :disabled="isLoading"
                  >
                  <p class="tw-text-xl">{{ size }}</p>
                </div>
              </div>
              <p class="error-text">{{ formData.sizes.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Sales Price</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.price.value"
                label="Sales Price"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('price')"
                @input="validateFormData('price')"
              />
              <p class="error-text">{{ formData.price.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">WHP</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.whp.value"
                label="Sales Price"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('whp')"
                @input="validateFormData('whp')"
              />
              <p class="error-text">{{ formData.whp.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Min Quantity</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.min_quantity.value"
                label="Sales Price"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('min_quantity')"
                @input="validateFormData('min_quantity')"
              />
              <p class="error-text">{{ formData.min_quantity.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Max Quantity</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.max_quantity.value"
                label="Sales Price"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('max_quantity')"
                @input="validateFormData('max_quantity')"
              />
              <p class="error-text">{{ formData.max_quantity.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Interest</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.interest.value"
                label="Sales Price"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('interest')"
                @input="validateFormData('interest')"
              />
              <p class="error-text">{{ formData.interest.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Quantity In Stock</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.quantity.value"
                label="Quantity"
                type="number"
                :disabled="isLoading"
                @blur="validateFormData('quantity')"
                @input="validateFormData('quantity')"
              />
              <p class="error-text">{{ formData.quantity.errorMessage }}</p>
            </v-col>
          </v-row>
          <hr class="divider">
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Value Of Quantity In Stock</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                label="Value Of Quantity In Stock"
                type="number"
                :value="valOfQtyInStock"
                disabled
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">State</p>
            </v-col>
            <v-col cols="12" md="9">
              <div class="product-select">
                <v-combobox
                  v-model="formData.state.value"
                  label="State"
                  item-title="name"
                  item-value="code"
                  variant="outlined"
                  :return-object="false"
                  :items="states"
                  :disabled="isLoading || loadingWarehouse"
                  @update:model-value="handleStateSelection"
                ></v-combobox>
              </div>
              <p class="error-text">{{ formData.state.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Warehouse</p>
            </v-col>
            <v-col cols="12" md="9">
              <div class="product-select">
                <v-combobox
                  v-model="formData.warehouse.value"
                  label="Warehouse"
                  variant="outlined"
                  item-title="name"
                  item-value="id"
                  :return-object="false"
                  :loading="loadingWarehouse"
                  :items="warehouses"
                  :disabled="isLoading || loadingWarehouse"
                  @update:model-value="validateFormData('warehouse')"
                ></v-combobox>
              </div>
              <p class="error-text">{{ formData.warehouse.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Category</p>
            </v-col>
            <v-col cols="12" md="9">
              <div class="product-select">
                <v-combobox
                  v-model="formData.category.value"
                  label="Category"           
                  variant="outlined"
                  item-title="category_name"
                  item-value="category_id"
                  :return-object="false"
                  :items="categories"
                  :disabled="isLoading"
                  @update:model-value="validateFormData('category')"
                ></v-combobox>
              </div>
              <p class="error-text">{{ formData.category.errorMessage }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="3">
              <p class="tw-text-lg tw-font-medium">Manufacturer</p>
            </v-col>
            <v-col cols="12" md="9">
              <AppInput
                v-model:value="formData.manufacturer.value"
                label="Manufacturer"
                type="text"
                :disabled="isLoading"
                @blur="validateFormData('manufacturer')"
                @input="validateFormData('manufacturer')"
              />
              <p class="error-text">{{ formData.manufacturer.errorMessage }}</p>
            </v-col>
          </v-row>
        </div>
        <div class="btn-container">
          <AppButton @click="validateFormData(undefined, true)" class="mr-3" type="submit" :loading="isLoading" :disabled="isLoading">
            Create
          </AppButton>

          <AppButton @click="closeModal" :disabled="isLoading">
            Cancel
          </AppButton>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CustomFormData, CreateProductDto, WarehouseByState } from '@/types'
import { formValidator, openToastNotification } from '@/utils'
import { CreateProductSchema } from '@/schemas'
import { useWarehouseStore, useProductStore, useCategoryStore, } from '@/stores'

// ================= COMPONENTS =============== //
import AppInput from '@/components/AppInput.vue'
import AppButton from '@/components/AppButton.vue'
import AppFileUpload from '@/components/AppFileUpload.vue'

const emit = defineEmits(['close', 'completed']);
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
});

const categoryStore = useCategoryStore();
const productStore = useProductStore();
const warehouseStore = useWarehouseStore();

const isLoading = ref<boolean>(false);
const loadingWarehouse = ref<boolean>(false);
const startFileUpload = ref<boolean>(false);
const warehouses = ref<WarehouseByState>([]);
const productSizes = ['S', 'M', 'L', 'XL', 'XXL', 'NIL'];
const states = computed(() => warehouseStore.states);
const categories = computed(() => categoryStore.categories);
const valOfQtyInStock = computed(() => {
  const result = formData.value.price.value * formData.value.quantity.value;
  return result || null;
});
const createProductPayload = ref<CreateProductDto>({} as CreateProductDto);

const formData = ref<CustomFormData>({
  name: {
    value: null,
    errorMessage: null,
  },
  description: {
    value: null,
    errorMessage: null,
  },
  images: {
    value: [],
    errorMessage: null,
  },
  sizes: {
    value: [],
    errorMessage: null,
  },
  price: {
    value: null,
    errorMessage: null,
  },
  whp: {
    value: null,
    errorMessage: null,
  },
  min_quantity: {
    value: null,
    errorMessage: null,
  },
  max_quantity: {
    value: null,
    errorMessage: null,
  },
  interest: {
    value: null,
    errorMessage: null,
  },
  quantity: {
    value: null,
    errorMessage: null,
  },
  state: {
    value: null,
    errorMessage: null,
  },
  warehouse: {
    value: null,
    errorMessage: null,
  },
  manufacturer: {
    value: null,
    errorMessage: null,
  },
  category: {
    value: null,
    errorMessage: null,
  },
});

// ================== METHODS ================= //
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
    images: {
      value: [],
      errorMessage: null,
    },
    sizes: {
      value: [],
      errorMessage: null,
    },
    price: {
      value: null,
      errorMessage: null,
    },
    whp: {
    value: null,
    errorMessage: null,
  },
  interest: {
    value: null,
    errorMessage: null,
  },
  min_quantity: {
    value: null,
    errorMessage: null,
  },
  max_quantity: {
    value: null,
    errorMessage: null,
  },
    quantity: {
      value: null,
      errorMessage: null,
    },
    state: {
      value: null,
      errorMessage: null,
    },
    warehouse: {
      value: null,
      errorMessage: null,
    },
    manufacturer: {
      value: null,
      errorMessage: null,
    },
    category: {
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

function handleSavedFile(files: Array<File | string>) {
  formData.value.images.value = [...files];
}

function handleFileError(errorMessage: string | null) {
  formData.value.images.errorMessage = errorMessage;
}

function handleFileUploadSuccess(urls: Array<string> | null) {
  startFileUpload.value = false;
  if (!urls) {
    isLoading.value = false;
    return;
  }

  const {whp, interest, max_quantity, min_quantity, name, warehouse, sizes, state, price, quantity, manufacturer, category, description } = createProductPayload.value;

  // createProductPayload.value.images = urls
  
  // createProductPayload.value.price = price.toString() as any;
  // createProductPayload.value.quantity = quantity.toString() as any;
  // createProductPayload.value.quantity = quantity.toString() as any;
  // createProductPayload.value.whp = whp.toString() as any;
  // createProductPayload.value.interest = interest.toString() as any;
  // createProductPayload.value.max_quantity = max_quantity.toString() as any;
  // createProductPayload.value.min_quantity = min_quantity.toString() as any;

  const formData = new FormData()


  urls.forEach((elm)=> {
      formData.append('images', elm);
  })

  formData.append('price', price.toString())
  formData.append('quantity', quantity.toString())
  formData.append('whp', whp.toString())
  formData.append('interest', interest.toString())
  formData.append('max_quantity', max_quantity.toString())
  formData.append('min_quantity', min_quantity.toString())
  formData.append('manufacturer', manufacturer.toString())
  formData.append('warehouse', warehouse.toString())
  formData.append('state', state.toString())
  formData.append('sizes', sizes.toString())
  formData.append('name', name.toString())
  formData.append('description', description.toString())
  formData.append('category', category.toString())

  createProduct(formData);
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

async function handleStateSelection(stateId: string) {
  if (states.value.findIndex((i: any) => i.code == stateId) >= 0) {
    formData.value.state.errorMessage = null;
    loadingWarehouse.value = true;
    warehouses.value = await warehouseStore.fetchWarehouseByState(stateId);
    loadingWarehouse.value = false;
  }
  else {
    formData.value.state.errorMessage = 'State is required';
  }
}

async function validateFormData(field?: keyof CreateProductDto, proceedOnSuccess = false) {
  const payload = await formValidator<CreateProductDto>(formData, CreateProductSchema, field);
  if (payload && proceedOnSuccess) {
    isLoading.value = true;
    createProductPayload.value = payload;
    startFileUpload.value = true;
  }
}

async function createProduct(payload: any) {
  isLoading.value = true;
  try {
    // payload.price = payload.price.toString() as any;
    // payload.quantity = payload.quantity.toString() as any;
    // const urls = await handleFileUpload(payload.images);
    // if (urls) {
    //   payload.images = [];
    //   urls.forEach(url => payload.images.push({ image_url: url }))
    // }

    const success = await productStore.createProduct(payload);
    if (success) {
      emit('completed');
      clearFormData();
      openToastNotification({
        message: 'Product created successfully'
      })
    }
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
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
