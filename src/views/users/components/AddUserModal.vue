<template>
  <div>
    <v-dialog
      persistent
      v-model="props.openModal"
      class="dialog"
      scrollable
      max-width="600px"
    >
      <v-card class="px-4 py-7">
        <div class="title-container">
          <X class="tw-cursor-pointer" color="red" @click="closeModal()" />
          <div class="title">
            <p class="tw-text-2xl tw-font-bold">Add New User</p>
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
                id="firstname"
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
                id="lastname"
                label="Enter Last name"
                type="text"
              />
            </div>

            <div class="mb-3">
              <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                Email
              </label>
              <AppInput
                v-model:value="formData.email"
                id="email"
                label="Enter email address"
                type="email"
              />
            </div>

            <div class="mb-3">
              <label for="warehouse-name" class="tw-text-lg tw-font-medium">
                Roles
              </label>
              <v-select
                v-model="formData.state"
                :items="stateList"
                variant="outlined"
                density="compact"
                item-title="name"
                item-value="code"
                label="Select role"
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
                @click="submit"
              >
                {{ action === "create" ? "Submit " : "Update" }}
              </AppButton>

              <AppButton
                @click="closeModal()"
                secondary
                type="button"
                :disabled="loading"
              >
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
import { ref, computed, onMounted, watch } from "vue";
import { X } from "lucide-vue-next";
import { openToastNotification, formValidator } from "@/utils";
import { CreateWarehouseSchema } from "@/schemas";
import { useWarehouseStore, useDriverStore } from "@/stores";

// ============ COMPONENTS =================== //
import AppSelect from "@/components/AppSelect.vue";
import AppInput from "@/components/AppInput.vue";
import AppButton from "@/components/AppButton.vue";

const emit = defineEmits(["close", "completed"]);
const props = defineProps({
  action: {
    type: String,
    default: "create",
    description: "options are create and edit",
  },
  openModal: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();
const driverStore = useDriverStore();
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
  emit("close");
}

watch(
  () => props.openModal,
  (newval) => {
    if (newval) {
      // formData.value.firstName = props.driver.first_name;
      // formData.value.lastName = props.driver.last_name;
      // formData.value.email  = props.driver.email;
    }
  }
);

const updateWarehouse = (value?: any) => {
  formData.value.warehouse_id = value;
};

const submit = async () => {};

onMounted(async () => {
  warehouseStore.fetchAllWarehouses();
  warehouseStore.fetchStates();
});
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
