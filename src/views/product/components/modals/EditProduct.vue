<template>
  <div>
    <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="60vw">
      <v-card class="px-4 py-7">
        <div class="title-container">
          <div class="title">
            <p class="tw-text-3xl tw-font-semibold">Edit Product</p>
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
                :existing-images="formData.images.value!"
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
                    :checked="formData.sizes.value!.includes(size)"
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
                <v-autocomplete
                  v-model="formData.state.value"
                  auto-select-first="exact"
                  label="State"
                  variant="outlined"
                  item-title="name"
                  item-value="code"
                  :items="states"
                  :return-object="false"
                  :disabled="isLoading || loadingWarehouse"
                  @update:model-value="handleStateSelection"
                ></v-autocomplete>
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
                <v-autocomplete
                  v-model="formData.warehouse.value"
                  auto-select-first="exact"
                  label="Warehouse"
                  variant="outlined"
                  item-title="name"
                  item-value="id"
                  :items="warehouses"
                  :return-object="false"
                  :loading="loadingWarehouse"
                  :disabled="isLoading || loadingWarehouse"
                  @update:model-value="validateFormData('warehouse')"
                ></v-autocomplete>
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
                <v-autocomplete
                  v-model="formData.category.value"
                  auto-select-first="exact"
                  label="Category"           
                  variant="outlined"
                  item-title="category_name"
                  item-value="category_id"
                  :items="categories"
                  :return-object="false"
                  :disabled="isLoading"
                  @update:model-value="validateFormData('category')"
                ></v-autocomplete>
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
            Edit
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
import { ref, computed, watch } from 'vue'
import { CustomFormData, CreateProductDto, WarehouseByState, Product, UpdateProductDto } from '@/types'
import { formValidator, openToastNotification } from '@/utils'
import { UpdateProductSchema } from '@/schemas'
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

// =============== STORE =============== //
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const warehouseStore = useWarehouseStore();

// ============== DATA ================ //
const isLoading = ref<boolean>(false);
const loadingWarehouse = ref<boolean>(false);
const startFileUpload = ref<boolean>(false);
const warehouses = ref<WarehouseByState>([]);
const editProductPayload = ref<UpdateProductDto>({} as UpdateProductDto);
const productSizes = ['S', 'M', 'L', 'XL', 'XXL', 'NIL'];
const states = computed(() => warehouseStore.states);
const categories = computed(() => categoryStore.categories);
const selectedProduct = computed<Product>(() => productStore.selectedProduct as Product);
const valOfQtyInStock = computed(() => {
  const result = formData.value.price.value! * formData.value.quantity.value!;
  return result || null;
});

const defaultFormValue: CustomFormData<UpdateProductDto> = {
  productId: {
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
  images: {
    value: [],
    errorMessage: null,
  },
  sizes: {
    value: [],
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
  price: {
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
} 

const formData = ref({...defaultFormValue});

// ============= WATCHER ============== //
watch(selectedProduct, async (newValue) => {
  const data = { ...newValue };  
  formData.value.productId.value = data.product_id;
  formData.value.name.value = data.product_name;
  formData.value.description.value = data.description;
  formData.value.images.value = data.images.map(i => i.imageUrl);
  formData.value.sizes.value = data.sizes;
  formData.value.price.value = data.price;
  formData.value.quantity.value = data.stock_quantity;
  formData.value.state.value = data.state_id;
  formData.value.category.value = newValue.category_id;
  formData.value.manufacturer.value = newValue.manufacturer;
  formData.value.whp .value = data.whp;
  formData.value.interest.value = data.interest;
  formData.value.min_quantity.value = data.min_quantity;
  formData.value.max_quantity.value = data.max_quantity;

  loadingWarehouse.value = true;
  warehouses.value = await warehouseStore.fetchWarehouseByState(data.state_id);
  loadingWarehouse.value = false;
  formData.value.warehouse.value = newValue.warehouse_id;
},
{ deep: true })

// ================== METHODS ================= //
function clearFormData() {
  formData.value = {...defaultFormValue};
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

function updateSize(value: string) {
  if (isLoading.value === true || !formData.value.sizes.value) return;

  const existingIdx = formData.value.sizes.value.indexOf(value) || -1;

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

async function validateFormData(field?: keyof UpdateProductDto, proceedOnSuccess = false) {
  const payload = await formValidator<UpdateProductDto>(formData, UpdateProductSchema, field);
  console.log(payload, 'payload');
  
  if (payload && proceedOnSuccess) {
    isLoading.value = true;
    editProductPayload.value = payload;
    startFileUpload.value = true;
  }
}

function handleFileUploadSuccess(urls: Array<string> | null) {
  startFileUpload.value = false;
  if (!urls) {
    isLoading.value = false;
    return;
  }

  const {whp, interest, max_quantity, min_quantity, productId, name, warehouse, sizes, state, price, quantity, manufacturer, category, description } = editProductPayload.value;


  const formData = new FormData()
  const prevImages = urls.filter((elm) => typeof elm === 'string');

  const deletedImages =  selectedProduct.value.images.filter((elm)=>{
    return !prevImages.includes(elm.imageUrl);
  })?.map((item:any)=> item.id)

  console.log(deletedImages)

  if(deletedImages.length) formData.append('deleteimages', deletedImages.toString());

  urls.forEach((elm)=> {
    if(typeof elm !== 'string') {
      formData.append('images', elm);
    }
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
  formData.append('productId', productId.toString())


  editProduct(formData);
}

async function editProduct(payload: any) {
  isLoading.value = true;
  try {
    const success = await productStore.updateProduct(payload);
    if (success) {
      emit('completed');
      clearFormData();
      openToastNotification({
        message: 'Product Edited Successfully'
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
