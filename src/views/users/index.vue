<template>
   <div class="users tw-mt-[60px] tw-mx-auto tw-w-[50%]">
    <div class="tw-flex  tw-items-center tw-justify-between py-3 tw-mb-[30px]">
        <h1 class="tw-text-2xl tw-font-bold"> 1 user(s)</h1>
        <v-btn color="green" @click="openAddUserModal = true"> Add User</v-btn>
    </div>
    <div class="user tw-flex tw-justify-between">
        <div class="">
            <h3 class="tw-font-bold">Micheal Olalekan</h3>
            <small>Supervisor</small>
        </div>

        <div class="tw-flex tw-gap-3">
            <v-btn>Change Role</v-btn>
            <v-btn color="primary" @click="openConfirmModal = true">Delete</v-btn>
        </div>
    </div>
   </div>
   <AddUserModal
    :openModal="openAddUserModal"
    @close="openAddUserModal = false" 
   />
   <ConfirmDeleteModal
        delete
        :openModal="openConfirmModal" 
        @close="openConfirmModal = false" 
        @proceed="proceedToDelete" 
        title="Are you sure you want to delete this user??"
    />
</template>
 
<script lang="ts" setup>
import { ref } from "vue";
import AddUserModal from "./components/AddUserModal.vue";
import ConfirmDeleteModal from "@/components/AppConfirmModal.vue";

const openAddUserModal = ref(false)
const openConfirmModal = ref(false)

const proceedToDelete = () => {}
</script>