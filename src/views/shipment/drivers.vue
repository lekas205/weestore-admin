<template>
  <section class="tw-p-[30px]">
    <!-- card -->
    <v-row>
      <v-col :cols="3">
        <div
          class="driver-card tw-bg-blue tw-text-white text-center tw-rounded-lg pa-5"
        >
          <p class="w-text-[20px] tw-mb-5">Number of Drivers</p>
          <h3 class="tw-font-bold tw-text-[31px]">{{ pagination.total }}</h3>
        </div>
      </v-col>
    </v-row>

    <app-table-wrapper
      :hasDelete="selected.length ? true : false"
      searchLabelText="Search by Name,email,phone"
      class="tw-mt-[50px]"
      createBtnText="Create Driver"
      tableName="drivers"
      @create="openDriverModal = true"
      @search="search"
      @delete="openConfirmModal = true"
      @filter="fetchDrivers($event)"
      @export="fetchDrivers($event)"
    >
      <v-data-table
        hide-default-footer
        :items="driversTableData"
        :loading="loading"
        :headers="headers"
        :items-per-page="pagination?.currentPageTotal"
        loading-text="Loading... Please wait"
        class="custom-table"
        show-select
        v-model="selected"
      >
        <template v-slot:item.action="{ item }">
          <FilePenLine @click="editCustomer(item.id)" />
        </template>
        <template v-slot:bottom>
          <TableFooter v-bind="pagination" @next="next($event)" />
        </template>
      </v-data-table>
    </app-table-wrapper>

    <CreateDriverModal
      :action="status"
      :driver="itemToEdit"
      :openModal="openDriverModal"
      @close="openDriverModal = false"
      @completed="fetchDrivers()"
    />
    <ConfirmCancelModal
      :openModal="openConfirmModal"
      @close="openConfirmModal = false"
      @proceed="deleteDriver"
      title="Are you sure you want to delete selected driver(s)?"
    />
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { FilePenLine } from "lucide-vue-next";
import { onMounted, ref, computed, watch } from "vue";
import { ChevronLeft } from "lucide-vue-next";

import TableFooter from "@/components/AppTableFooter.vue";
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import ConfirmCancelModal from "@/components/AppConfirmModal.vue";
import CreateDriverModal from "./components/CreateDriverModal.vue";

import { PAYMENT_METHOD } from "@/constants";
import { openToastNotification } from "@/utils";
import { useDriverStore, useAuthStore, useWalletStore } from "@/stores";

const authStore = useAuthStore();
const driverStore = useDriverStore();

const { drivers } = storeToRefs(driverStore);

const page = ref(1);
const selected = ref([]);
const status = ref("create");
const payload = ref({
  page: 1,
  search: "",
});

const itemToEdit = ref<any>({});
const loading = ref<boolean>(false);
const openConfirmModal = ref<boolean>(false);
const openDriverModal = ref<boolean>(false);

const headers = ref<any[]>([
  {
    align: "start",
    key: "name",
    sortable: false,
    title: "Driver Name",
  },
  { key: "phone_no", title: "Phone Number" },
  { key: "state", title: "State" },
  { key: "warehouse", title: "Warehouse" },
  { key: "license", title: "Driver's License" },
  { key: "sales_performance", title: "Sales Performance" },
  { key: "action", title: "Action" },
]);

const pagination = computed<any>(() => drivers.value?.pagination);
const items = computed<any[]>(() => {
  return [];
});

const driversTableData = computed(() => {
  return drivers.value?.data?.map((elm: any) => {
    return {
      id: elm.driver_id,
      name: `${elm.first_name} ${elm.last_name}`,
      phone_no: elm.phone,
      state: elm.state,
      warehouse: elm.warehouse,
      license: elm.license,
      sales_performance: elm.sales_performance,
    };
  });
});

const search = (text: string) => {
  payload.value.search = text;
  payload.value.page = 1;

  fetchDrivers(payload.value);
};

const deleteDriver = async () => {
  openConfirmModal.value = false;
  loading.value = true;
  const res = await driverStore.deleteDriver(selected.value);

  if (res) {
    openToastNotification({
      message: `Driver(s) has been deleted successfully`,
      variant: "success",
    });
    selected.value = [];
  }
  loading.value = false;
};

const next = (page: number) => {
  payload.value.page = page;
};

const editCustomer = (id: string) => {
  itemToEdit.value = drivers.value.data.find(
    (elm: any) => elm.driver_id === id
  );
  openDriverModal.value = true;
  status.value = "edit";
};

const fetchDrivers = async (query?: any) => {
  loading.value = true;
  await driverStore.fetchAllDrivers(query);
  loading.value = false;
  status.value = "create";
};

onMounted(async () => {
  if (drivers.value.data.length) return;
  authStore.toggleLoader();
  await fetchDrivers();
  authStore.toggleLoader();
});
</script>
