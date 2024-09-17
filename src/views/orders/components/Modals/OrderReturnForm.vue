<template>
    <div>
      <v-dialog persistent v-model="props.openModal" class="dialog" scrollable max-width="65vw">
        <v-card class="px-4 py-7">
          <div class="title-container">
            <div class="title tw-flex tw-gap-[50px] tw-justify-center mt-5">
              <p 
                @click="returnType= 'half' "
                class="tw-font-[700] tw-text-[20px] tw-text-[#A5A1A8] tw-cursor-pointer" 
                :class="{'tw-underline tw-text-[#000]': returnType === 'half'}"
             >Half return </p>
                <p 
                    @click="returnType= 'full' "
                    class="tw-font-[700] tw-text-[20px] tw-text-[#A5A1A8] tw-cursor-pointer" 
                    :class="{'tw-underline tw-text-[#000]': returnType === 'full'}"
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
                  v-model="formData.wharehouse"
                  :value="formData.wharehouse"
                  label="Wharehouse"
                  type="text"
                  readonly
                />
                <!-- {{ formData.wharehouse }} -->
                <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="3">
                <p class="tw-text-lg tw-font-medium">Reseller’s Name</p>
              </v-col>
              <v-col cols="12" md="9">
                <AppInput
                  label="Reseller’s Name"
                  type="text"
                  readonly
                  v-model="formData.reseller_name"
                  :value="formData.reseller_name"
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
                  label="Order ID"
                  type="text"
                  readonly
                  :value="formData.order_id"
                  v-model="formData.order_id"
                />
                <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
              </v-col>
            </v-row>

            <hr/>

            <v-row class="mt-4">
                <v-col cols="12" md="6" v-for="(i, index ) in formData.orders">
                    <v-row>
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Product Name</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            v-model="formData.orders[index].product_name"
                            :value="formData.orders[index].product_name"
                            label=""
                            type="text"
                            readonly
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Sales Price</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            :value="formData.orders[index].price"
                            v-model="formData.orders[index].price"
                            label=""
                            type="text"
                            readonly
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="3">
                          <p class="tw-text-lg tw-font-medium">Quantity in Stock</p>
                      </v-col>
                      <v-col cols="12" md="9">
                          <AppInput
                          :value="formData.orders[index].quantity"
                          v-model="formData.orders[index].quantity"
                          label=""
                          type="number"
                          />
                          <p class="error-text" v-if="formData.orders[index].quantity  > formData.orders[index].initial_quantity">{{ `Sorry quatity can't be increased above ${formData.orders[index].initial_quantity}` }}</p>

                      </v-col>

                    </v-row>
                    <v-row class="mb-3">
                        <v-col cols="12" md="3">
                            <p class="tw-text-lg tw-font-medium">Value of Quantity In Stock</p>
                        </v-col>
                        <v-col cols="12" md="9">
                            <AppInput
                            :value="formData.orders[index].amount"
                            v-model="formData.orders[index].amount"
                            label=""
                            type="text"
                            readonly
                            />
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
                        v-model="formData.amount_paid"
                        :value="formData.amount_paid"
                        label=""
                        type="text"
                        readonly
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
                        :value="formData.amount_retain"
                        v-model="formData.amount_retain"
                        label=""
                        type="text"
                        readonly
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
                        <p class="tw-text-lg tw-font-medium"> Reason to Return</p>
                    </v-col>
                    <v-col cols="12" md="7">
                        <v-textarea
                            :value="formData.reason"
                            v-model="formData.reason"
                            variant="outlined"
                            readonly
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
                        :value="formData.amount_return"
                        v-model="formData.amount_return"
                        label=""
                        type="text"
                        readonly
                        />
                        <!-- <p class="error-text">{{ formData.name.errorMessage }}</p> -->
                    </v-col>
                </v-row>
            </v-col>
          </v-row>

          <div class="btn-container">
            <v-btn  @click="closeModal" size="large" readonly variant="text" color="primary">
              Cancel
            </v-btn>
            <v-btn @click="submit" class="mr-3" size="large" color="primary" type="submit" :loading="isLoading" :disabled="disabledBtn || isLoading">
              {{ status === 'request' ?" Submit request": "Approve"}}
            </v-btn>
  

          </div>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  import AppInput from '@/components/AppInput.vue'
  import AppButton from '@/components/AppButton.vue'
  import AppFileUpload from '@/components/AppFileUpload.vue'
  import { CustomFormData, CreateProductDto, Category, IState } from '@/types'
  import { formValidator, handleFileUpload, openToastNotification, formatAsMoney } from '@/utils'
  import { CreateProductSchema } from '@/schemas'
  import { useOrderStore } from '@/stores'
  
  const orderStore = useOrderStore();
  const emit = defineEmits(['close', 'refreshData']);
  const props = defineProps({
    openModal: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default(){
        return {}
      }
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
  
  const returnType = ref('half');
  const isLoading = ref<boolean>(false);

  const formData = ref<any>({
    order_id: "",
    wharehouse: "",
    reseller_name: "",
    orders: [{
      Porduct_name: "",
      price: "",
      quantity: "",
      amount: "",

    }],
    amount_paid: "",
    amount_retain: "",
    reason: "",
    amount_return: ","

  })
  
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

  watch(()=> props.openModal, (newval: boolean)=>{
    if(newval){
      formData.value.reason = props.order.reason;
      formData.value.wharehouse = props.order.warehouse_name || props.order.warehouse;
      formData.value.order_id = props.order.order_no;
      formData.value.reseller_name = props.order.first_name + " " +  props.order.last_name;
      formData.value.orders = props.order.orderItems.map((elm:any)=>{
        return {
          id: elm.product_id,
          product_name: elm.product_name,
          price: elm.price,
          quantity: elm.quantity,
          amount: elm.amount,
          initial_quantity:  Number(elm.quantity),
        }
      })
      formData.value.amount_paid = props.order.amount ||  props.order.total_amount;      
    }
  } )

  watch(
    () => formData,
    (newValue:any) => {
      if(newValue){
        recalculateORders()
      }
    },
    { deep: true }
  )

  const disabledBtn = computed(()=>{
    return formData.value.orders.some((elm:any)=> elm.quantity > elm.initial_quantity)
  })

  const recalculateORders = () => {
    formData.value.orders.forEach((elm: any, index:number)=>{
      elm.amount = elm.price * elm.quantity
       index === 0 ? 
       formData.value.amount_retain = elm.amount 
       : formData.value.amount_retain+= elm.amount
    });
    formData.value.amount_return =  formData.value.amount_paid -  formData.value.amount_retain
  } 

  const createReturnRequestDTO = computed(()=>{
    return {
      ordeerId: props.order.order_id,
      payload: {
        reason: formData.value.reason,
        returnType : returnType.value === 'half' ? "HALF_RETURN": "FULL_RETURN",
        products: formData.value.orders.map((elm:any)=>{
          return {
            productId: elm.id,
            quantity: Number(elm.quantity) ,
            amount: elm.amount,
          }
        })
      }
    }
  })

  const submit = async () => {
    isLoading.value = true;
    props.status === 'request' ?
      await  orderStore.initiateOrderReturn(createReturnRequestDTO.value)
      : await orderStore.ApproveDeclineReturn({requestId : props.order.request_id, action: "approve"});
    isLoading.value = false;

    closeModal()
    emit("refreshData")
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
  