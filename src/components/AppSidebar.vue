<template>
  <v-navigation-drawer class="sidebar-wrapper">
    <template v-slot:prepend>
      <div class="sidebar-top">
        <img src="@/assets/images/svg/morebuy-logo-background.svg" alt="Morebuy Logo">
        <img class="sidebar-logo" src="@/assets/images/svg/morebuy-logo.svg" alt="Morebuy Logo">
      </div>
    </template>
    <div class="sidebar">
      <div class="sidebar-link-container">
        <div
          v-for="(item, idx) in sidebarLinks"
          :key="idx"
          class="sidebar-link"
          :class="{'active': item.isActive, [item.customClass]: true}"
        >
          <img v-if="item.isActive" :src="item.activeIcon" alt="">
          <img v-else :src="item.icon" alt="">
          <h2 class="tw-text-xl">{{ item.name }}</h2>
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

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { ROUTES } from '@/constants'
import AppButton from '@/components/AppButton.vue'

const authStore = useAuthStore();
const sidebarLinks = ref([
  {
    name: 'Dashboard',
    link: ROUTES.dashboard.path,
    isActive: true,
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    customClass: '',
  },
  {
    name: 'Stock',
    link: null,
    isActive: false,
    icon: StockIcon,
    activeIcon:StockIconActive,
    customClass: '',
  },
  {
    name: 'Orders',
    link: ROUTES.orders.path,
    isActive: false,
    icon: OrdersIcon,
    activeIcon: OrdersIconActive,
    customClass: '',
  },
  {
    name: 'Customers',
    link: ROUTES.customer.path,
    isActive: false,
    icon: CustomersIcon,
    activeIcon: CustomersIconActive,
    customClass: '',
  },
  {
    name: 'Shipment',
    link: ROUTES.shipment.path,
    isActive: false,
    icon: ShipmentIcon,
    activeIcon: ShipmentIconActive,
    customClass: '',
  },
  {
    name: 'Wallets',
    link: ROUTES.wallet.path,
    isActive: false,
    icon: WalletsIcon,
    activeIcon: WalletsIconActive,
    customClass: '',
  },
  {
    name: 'Credits',
    link: ROUTES.credit.path,
    isActive: false,
    icon: CreditsIcon,
    activeIcon: CreditsIconActive,
    customClass: '',
  },
  {
    name: 'Payments',
    link: ROUTES.payment.path,
    isActive: false,
    icon: PaymentsIcon,
    activeIcon: PaymentsIconActive,
    customClass: 'payments-link'
  },
]);

</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  background-color: #FE0000;
}

.sidebar-top {
  position: relative;
}

.sidebar-logo {
  position: absolute;
  top: 0;
}

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0.75rem;
  min-height: 100%;
}

.sidebar-link {
  color: white;
  margin-right: auto;
  margin-left: auto;
  padding: 0.85rem;
  padding-left: 2rem;
  margin-bottom: 0.5rem;
  display: flex;
  cursor: pointer;

  img {
    margin-right: 0.5rem;
    width: 12%;
  }
}

.sidebar-link.active {
 background-color: white;
 color: red;
 border-radius: 11px;
}

.payments-link {
  padding-left: 1.5rem;
  img {
    width: 22%;
  }
}
</style>
