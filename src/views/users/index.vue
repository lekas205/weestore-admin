<template>
   <div class="users tw-mt-[60px] tw-mx-auto tw-w-[50%]">
    <div class="tw-flex  tw-items-center tw-justify-between py-3 tw-mb-[30px]">
        <h1 class="tw-text-2xl tw-font-bold"> {{ admins?.data?.length }} user(s)</h1>
        <v-btn color="green" @click="addAdmin"> Add User</v-btn>
    </div>
    <div class="user tw-flex tw-justify-between mb-6 last:mb-6" v-for="admin in  admins.data" :key="admin.adminId">
        <div class="">
            <h3 class="tw-font-bold"> {{ `${admin.first_name} ${admin.last_name}`  }} </h3>
            <small>{{  admin.role_name }}</small>
        </div>

        <div class="tw-flex tw-gap-3">
            <v-btn @click="initiateProcess(admin)">Change Role</v-btn>
            <v-btn color="primary" @click="openConfirmModal = true">Delete</v-btn>
        </div>
    </div>
   </div>
   <AddUserModal
   :action="action"
    :openModal="openAddUserModal"
    @close="openAddUserModal = false" 
    @success="refreshData"
    :admin="adminToUpdate"
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
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore, useAuthStore } from "@/stores";
import AddUserModal from "./components/AddUserModal.vue";
import ConfirmDeleteModal from "@/components/AppConfirmModal.vue";

const userStore = useUserStore()
const authStore = useAuthStore()
const { admins } = storeToRefs(userStore)

const action = ref("create")
const openAddUserModal = ref(false)
const openConfirmModal = ref(false)
const adminToUpdate = ref({})

const proceedToDelete = () => {}

const fetchAdmins = async ()=>{
    authStore.toggleLoader();
    await userStore.fetchAdmins()
    authStore.toggleLoader();
}

const refreshData = () => {
    fetchAdmins();
  
    openAddUserModal.value = false
}

const addAdmin = () =>{
    action.value = "create" 
    adminToUpdate.value = {}
    openAddUserModal.value = true
}

const initiateProcess = (admin:any) =>{  
    action.value = "edit"  
    adminToUpdate.value = admin
    openAddUserModal.value = true
}

onMounted(()=>{
    fetchAdmins()
})
</script>