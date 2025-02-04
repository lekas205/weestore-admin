<template>
   <div class="users tw-mt-[60px] tw-mx-auto tw-w-[50%]">
    <div class="tw-flex  tw-items-center tw-justify-between py-3 tw-mb-[30px]">
        <h1 class="tw-text-2xl tw-font-bold"> {{ admins?.data?.length }} user(s)</h1>
        <v-btn color="green" @click="addAdmin"> Add User</v-btn>
    </div>
    <div class="user tw-flex tw-justify-between mb-6 last:mb-6" v-for="admin in  admins.data" :key="admin.adminId">
        <div class="">
            <h3 class="tw-font-bold"> {{ `${admin.first_name} ${admin.last_name}`  }} </h3>
            <small>{{  ADMIN_ROLES[admin.role_name] }}</small>
        </div>

        <div class="tw-flex tw-gap-3">
            <v-btn @click="initiateProcess(admin, 'edit')">Change Role</v-btn>
            <v-btn color="primary" @click="initiateProcess(admin, 'delete')">Delete</v-btn>
        </div>
    </div>
   </div>
   <AddUserModal
    :action="action"
    :openModal="openAddUserModal"
    @close="openAddUserModal = false" 
    @success="refreshData($event)"
    :admin="adminToUpdate"
   />
   <ConfirmDeleteModal
    delete
    :openModal="openConfirmModal" 
    @close="openConfirmModal = false" 
    @proceed="proceedToDelete(adminToUpdate?.adminId)" 
    title="Are you sure you want to delete this user??"
    />
    <DriverLoginDetails :openModal="showModal" :data="loginData"  @close="showModal = false"/>

</template>
 
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { ADMIN_ROLES } from "@/constants";
import { useUserStore, useAuthStore } from "@/stores";
import DriverLoginDetails from "../shipment/components/DriverLoginDetails.vue";
import AddUserModal from "./components/AddUserModal.vue";
import { openToastNotification } from "@/utils";

import ConfirmDeleteModal from "@/components/AppConfirmModal.vue";

const userStore = useUserStore()
const authStore = useAuthStore()
const { admins } = storeToRefs(userStore)

const action = ref("create")
const showModal = ref(false)
const openAddUserModal = ref(false)
const openConfirmModal = ref(false)
const adminToUpdate = ref<any>({})
const loginData = ref({})

const fetchAdmins = async ()=>{
    authStore.toggleLoader();
    await userStore.fetchAdmins()
    authStore.toggleLoader();
}

const refreshData = (data: any) => {
    fetchAdmins();
    loginData.value = data

    showModal.value = true
    openAddUserModal.value = false
}

const addAdmin = () =>{
    action.value = "create" 
    adminToUpdate.value = {}
    openAddUserModal.value = true
}

const initiateProcess = (admin:any, actionType: string) =>{  
    action.value = actionType
    adminToUpdate.value = admin
    if(actionType === 'edit'){
        openAddUserModal.value = true
    }else{
        openConfirmModal.value = true
    }
   
}

const proceedToDelete = async (adminId:string) =>{
    authStore.toggleLoader();
    openConfirmModal.value = false
   let res = await userStore.deleteAdmin(adminId)

   if(res){
        fetchAdmins()
        openToastNotification({message:  "Admin deleted successfully"});
   }

    authStore.toggleLoader();
}

onMounted(()=>{
    fetchAdmins()
})
</script>