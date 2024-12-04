<template>
  <section class="px-4 py-5">
    <StatCard :stats="dashboardStats" />
    <app-table-wrapper
      tableName="customers"
      searchLabelText="Search by Name,email,phone"
      class="tw-mt-[50px]"
      @search="search"
      @export="fetchCustomer($event)"
      @filter="fetchCustomer($event)"
    >
      <v-data-table
        hide-default-footer
        :items="items"
        :loading="loading"
        :headers="headers"
        :items-per-page="pagination?.currentPageTotal"
        loading-text="Loading... Please wait"
        class="custom-table"
      >
        <template v-slot:item.action="{ item }">
          <div class="tw-flex tw-items-center tw-gap-4">
            <ZoomIn
              class="tw-cursor-pointer"
              @click="router.push('/customers/' + item.id)"
            />
            <Trash2
              class="tw-cursor-pointer"
              @click="deleteCustomer(item.id)"
            />
          </div>
        </template>

        <template v-slot:bottom>
          <TableFooter v-bind="pagination" @next="paginateData($event)" />
        </template>
      </v-data-table>
    </app-table-wrapper>
    <DeleteModal
      :openModal="openDeleteModal"
      @close="openDeleteModal = false"
      @proceed="proceedToDelete"
      title="Are you sure you want to delete?"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Trash2, ZoomIn } from "lucide-vue-next";

import StatCard from "./components/StatCard.vue";
import TableFooter from "@/components/AppTableFooter.vue";
import AppTableWrapper from "@/components/AppTableWrapper.vue";
import DeleteModal from "@/components/AppConfirmModal.vue";

import { useCustomersStore, useAuthStore } from "@/stores";
import { formatDate, formatText, openToastNotification } from "@/utils";

const router = useRouter();
const authStore = useAuthStore();
const customerStore = useCustomersStore();

const { customers, dashboardStats } = storeToRefs(customerStore);

const page = ref(1);
const loading = ref(false);
const openDeleteModal = ref(false);
const itemToDelete = ref<string>("");
const payload = ref({
  page: 1,
  search: "",
});

const headers = ref<any[]>([
  // {
  //     align: 'start',
  //     key: 'id',
  //     sortable: false,
  //     title: 'ID',
  // },
  { key: "date", title: "Joining Date" },
  { key: "name", title: "Name" },
  { key: "email", title: "Email" },
  { key: "phone_no", title: "Phone Number" },
  { key: "referral", title: "How do you hear about us" },
  { key: "action", title: "Action" },
]);

const pagination = computed<any>(() => customers.value?.pagination);
const items = computed<any[]>(() => {
  return customers.value?.data?.map((elm: any) => {
    return {
      id: elm.customer_id,
      date: formatDate(elm.registration_date),
      name: `${formatText(elm.first_name)} ${formatText(elm.last_name)}`,
      email: elm.email,
      phone_no: elm.phone,
      referral: elm.referral ?? "--",
    };
  });
});

const fetchCustomer = async (query: any) => {
  loading.value = true;
  await customerStore.fetchCustomers(query);
  loading.value = false;
};

const deleteCustomer = (customerId: string) => {
  itemToDelete.value = customerId;
  openDeleteModal.value = true;
};

const paginateData = (page: number) => {
  payload.value.page = page;
  fetchCustomer(payload.value);
};

watch(
  () => page.value,
  (newPage) => {
    if (newPage) {
      payload.value.page = newPage;
      fetchCustomer(payload.value);
    }
  }
);

const search = (text: string) => {
  payload.value.search = text;
  payload.value.page = 1;

  fetchCustomer(payload.value);
};

const proceedToDelete = async () => {
  loading.value = true;
  openDeleteModal.value = false;
  const res = await customerStore.deleteCustomer(itemToDelete.value);
  await fetchCustomer({ page: page.value }), (loading.value = false);
  if (res) {
    openToastNotification({
      message: "Customer deleted successfully",
      variant: "success",
    });
  }
};

onMounted(async () => {
  if (customers.value.data.length && dashboardStats.value.totalCustomer) return;
  authStore.toggleLoader();
  await Promise.all([
    fetchCustomer({ page: page.value }),
    customerStore.getDashboardStats(),
  ]);
  authStore.toggleLoader();
});
</script>
