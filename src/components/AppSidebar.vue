<template>
  <v-navigation-drawer class="sidebar-wrapper">
    <template v-slot:prepend>
      <div class="sidebar-top">
        <img src="@/assets/images/svg/morebuy-logo-background.svg" alt="Morebuy Logo">
        <img class="sidebar-logo" src="@/assets/images/svg/morebuy-logo.svg" alt="Morebuy Logo">
      </div>
    </template>
    <div class="sidebar">
      <div>
        <div
          v-for="(item, idx) in sidebarLinks"
          :key="idx"
          class="sidebar-link-wrapper"
          :class="{[item.customClass]: true}"
        >
          <div
            class="sidebar-link"
            :class="{'active': item.isActive}"
            @click="handleSidebarNavigation(item.id)"
            v-if="item.access.includes(adminRole ?? '')"
          >
            <img v-if="item.isActive" :src="item.activeIcon" alt="" />
            <img v-else :src="item.icon" alt="">
            <h2 class="tw-text-xl">{{ item.title }}</h2>
            <div v-if="item.subLinks?.length" class="ml-auto">
              <ChevronDown v-if="item.isActive" />
              <ChevronRight v-else />
            </div>
          </div>
          <div
            v-if="item.subLinks?.length && item.isActive"
            class="sidebar-sub-link"
          >
            <div
              v-for="(sub, idx) in item.subLinks"
              :key="idx"
              class="sub-link"
              :class="{'active': sub.isActive}"
              @click="handleSublinkNavigation(item.id, sub.id)"
            >
              <Minus class="mr-2" />
              <p class="tw-text-lg">
                {{ sub.title }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebar-logout-container">
        <div class="logout-btn">
          <app-button @click="authStore.logout" secondary full>
             <img class="mr-3" src="@/assets/images/svg/logout-icon.svg" alt="">
            Logout
          </app-button>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import DashboardIcon from '@/assets/images/svg/dashboard-icon.svg'
import DashboardIconActive from '@/assets/images/svg/dashboard-icon-active.svg'
import StockIcon from '@/assets/images/svg/stock-icon.svg'
import StockIconActive from '@/assets/images/svg/stock-icon-active.svg'
import OrdersIcon from '@/assets/images/svg/orders-icon.svg'
import OrdersIconActive from '@/assets/images/svg/orders-icon-active.svg'
import CustomersIcon from '@/assets/images/svg/customers-icon.svg'
import CustomersIconActive from '@/assets/images/svg/customers-icon-active.svg'
import ShipmentIcon from '@/assets/images/svg/shipment-icon.svg'
import ShipmentIconActive from '@/assets/images/svg/shipment-icon-active.svg'
import WalletsIcon from '@/assets/images/svg/wallets-icon.svg'
import WalletsIconActive from '@/assets/images/svg/wallets-icon-active.svg'
import CreditsIcon from '@/assets/images/svg/credits-icon.svg'
import CreditsIconActive from '@/assets/images/svg/credits-icon-active.svg'
import PaymentsIcon from '@/assets/images/svg/payments-icon.svg'
import PaymentsIconActive from '@/assets/images/svg/payments-icon-active.svg'

import { ref, computed, onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ChevronRight, ChevronDown, Minus } from 'lucide-vue-next'
import { useAuthStore } from '@/stores'
import { ROUTES } from '@/constants'
import { SidebarLink } from '@/types'
import AppButton from '@/components/AppButton.vue'
import {  SAVED_ADMIN_ROLE } from '@/constants'


const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const activeLinkId = ref(0);
const sidebarLinks = ref<SidebarLink[]>([
  {
    id: 0,
    title: 'Dashboard',
    link: ROUTES.dashboard.name,
    isActive: true,
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    customClass: '',
    access:[
      "superadmin",
      "accountant",
      "customer_service",
      "internal_control_manager",
      "business_development_manager",
    ]
  },
  {
    id: 1,
    title: 'Stock',
    link: null,
    isActive: false,
    icon: StockIcon,
    activeIcon:StockIconActive,
    customClass: '',
    access: [
      "superadmin",
      "accountant",
      "customer_service",
      "internal_control_manager",
      "business_development_manager",
    ],
    subLinks: [
      {
        id: 0,
        title: 'Category',
        link: ROUTES.category.name,
        isActive: false,
      },
      {
        id: 1,
        title: 'Warehouse',
        link: ROUTES.warehouse.name,
        isActive: false,
      },
      {
        id: 2,
        title: 'Products',
        link: ROUTES.product.name,
        isActive: false,
      },
    ]
  },
  {
    id: 2,
    title: 'Orders',
    link: ROUTES.orders.name,
    isActive: false,
    icon: OrdersIcon,
    activeIcon: OrdersIconActive,
    customClass: '',
    access:[
      "superadmin",
      "accountant",
      "customer_service",
      "internal_control_manager",
      "business_development_manager",
    ],
  },
  {
    id: 3,
    title: 'Customers',
    link: ROUTES.customer.name,
    isActive: false,
    icon: CustomersIcon,
    activeIcon: CustomersIconActive,
    customClass: '',
    access: [
      "superadmin",
      "accountant",
      "customer_service",
      "internal_control_manager",
      "business_development_manager",
    ],
  },
  // {
  //   id: 4,
  //   title: 'Shipment',
  //   link: null,
  //   isActive: false,
  //   icon: ShipmentIcon,
  //   activeIcon: ShipmentIconActive,
  //   customClass: '',
  //   access: ["superadmin", "business_development_manager"],
  //   subLinks: [
  //     {
  //       id: 0,
  //       title: 'Fleet',
  //       link: ROUTES.fleet.name,
  //       isActive: false,
  //     },
  //     {
  //       id: 1,
  //       title: 'Drivers',
  //       link: ROUTES.driver.name,
  //       isActive: false,
  //     },
  //   ]
  // },
  {
    id: 4,
    title: 'Wallets',
    link: ROUTES.wallet.name,
    isActive: false,
    icon: WalletsIcon,
    activeIcon: WalletsIconActive,
    customClass: '',
    access: ["superadmin", "accountant", "internal_control_manager", "customer_service"],
  },
  {
    id: 5,
    title: 'Users',
    link: ROUTES.users.name,
    isActive: false,
    icon: CustomersIcon,
    activeIcon: CustomersIconActive,
    customClass: '',
    access: ["superadmin"],
  },
  {
    id: 6,
    title: 'Withdrawal Requests',
    link: ROUTES.withdrawal.name,
    isActive: false,
    icon: PaymentsIcon,
    activeIcon: PaymentsIconActive,
    customClass: '',
    access: ["superadmin",  "accountant"],
  },
]);

const adminRole = computed(()=> localStorage.getItem(SAVED_ADMIN_ROLE))

onBeforeMount(() => {
  // console.log(route.name)

  sidebarLinks.value.forEach(navLink => {
    if (navLink.link == route.name) {
      navLink.isActive = true;
    }
    else if (navLink.subLinks?.length) {
      navLink.subLinks.forEach(subLink => {
        if (subLink.link == route.name) {
          subLink.isActive = true;
          navLink.isActive = true;
        }
        else {
          subLink.isActive = false;
        }
      })
    }
    else {
      navLink.isActive = false;
    }
  })
})

function handleSidebarNavigation(id: number): void {
  const clickedLink = sidebarLinks.value[id];
  if (clickedLink.isActive) return;

  sidebarLinks.value.forEach((item) => {
    item.isActive = item.id === id;
    if (item.subLinks && item.subLinks.length > 0) {
      item.subLinks.forEach(subLink => subLink.isActive = false)
    }
  })

  if (clickedLink.link) {
    router.push({ name: clickedLink.link });
  }
}

function handleSublinkNavigation(id: number, subId: number) {
  const clickedLink = sidebarLinks.value[id];

  if (clickedLink.subLinks && clickedLink.subLinks.length > 0) {
    const clickedSubLink = clickedLink.subLinks[subId];
    if (clickedSubLink.isActive === true ) return;

    clickedLink.subLinks.forEach(subLink => subLink.isActive = subLink.id == subId);
    if (clickedSubLink.link) {
      router.push({ name: clickedSubLink.link });
    }
  }
}

</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  background-color: #000000;
}

.sidebar-top {
  position: relative;
}

.sidebar-logo {
width: 8rem;
  position: absolute;
  top: 20px;
  left: 10px;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0.75rem;
  min-height: 100%;
}

.sidebar-link-wrapper {
  max-width: 85%;
  margin: auto;
}

.sidebar-link {
  color: white;
  display: flex;
  align-items: center;
  padding: 0.85rem;
  cursor: pointer;

  img {
    margin-right: 0.5rem;
    width: 2rem;
    height: 2rem;
  }
}

.sidebar-link.active {
 background-color: white;
 color: red;
 border-radius: 11px;
}

.sidebar-sub-link {
  background-color: white;
  border-radius: 10px;
  color: #FE0000;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0.5rem; 
}

.sidebar-sub-link.active {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-top: 0.5rem; 
  height: auto;
  visibility: visible;
}

.sub-link {
  display: flex;
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
}

.sub-link.active {
  border-top: 1px solid red;
  border-bottom: 1px solid red;
  background: #D9D9D9CC;
}
</style>
