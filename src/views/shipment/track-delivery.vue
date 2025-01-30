<template>
  <div class="mt-5">
    <div class="pl-5">
      <v-btn color="primary" @click="$router.back()" class="mb-5"> <ChevronLeft/> Back </v-btn>
    </div>
    <GoogleMap
      style="width: 100%; height: 90vh"
      :api-key="apiKey"
      :center="position"
      :zoom="18"
      mapId="DEMO_MAP_ID"
      ref="mapRef"
    >
      <AdvancedMarker
        ref="markerRef"
        :options="{ position: position, title: 'Driver', content: carImgElement }"
      />
    </GoogleMap>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { ChevronLeft } from 'lucide-vue-next';

import { useAuthStore, useDriverStore } from '@/stores';
import { openToastNotification } from '@/utils';
import { db } from '@/lib/firebase';

import carImg from '@/assets/images/png/car-rotated.png';
import dayjs from 'dayjs';

const route = useRoute();
const authStore = useAuthStore();
const driverStore = useDriverStore();
const mapRef = ref<any>(null);
const markerRef = ref<any>(null);
const order = ref<any>(null);

let unsubscribe: any = null;

const inTransitOrders = computed(() => driverStore.in_transit_orders);

watch(() => mapRef.value?.ready, (ready) => {
  if (!ready) return
  // console.log(mapRef.value)
  // console.log(markerRef.value)
  // do something with the api using `mapRef.value.api`
  // or with the map instance using `mapRef.value.map`
});

// SETUP MAP
const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
const position = ref({
  lat: 6.478793381992304,
  lng: 3.3572053288441506
});

const coordinates: {lat: number, lng: number}[] = [
  {
    lat: 6.480307150100842, lng: 3.3599841295472483
  },
  // {
  //   lat: 6.479006588310194, lng: 3.3563255643009198
  // },
  // {
  //   lat: 6.479049229562956, lng: 3.3540081357480176
  // },
  // {
  //   lat: 6.47909187081213, lng: 3.352141318302625
  // },
  // {
  //   lat: 6.479134512057678, lng: 3.352463183379417
  // },
  // {
  //   lat: 6.479113191435355, lng: 3.3515405034926133
  // },
  // {
  //   lat: 6.479198473919264, lng: 3.3505749082622382
  // },
  // {
  //   lat: 6.479091870802283, lng: 3.3497380590136254
  // },
  // {
  //   lat: 6.479113191425521, lng: 3.3490514135164697
  // },
  // {
  //   lat: 6.479049229553122, lng: 3.3489655828293254
  // },
  // {
  //   lat: 6.479026280458317, lng: 3.348699747226414
  // },
  // {
  //   lat: 6.4788765178996295, lng: 3.347881524845871
  // },
  // {
  //   lat: 6.478576992664599, lng: 3.346438869584297
  // },
  // {
  //   lat: 6.478470019325569, lng: 3.3461158870465693
  // },
  // {
  //   lat: 6.477977941668919, lng: 3.3445871031239296
  // },
  // {
  //   lat: 6.477186337492623, lng: 3.34286452973553
  // }
]

// USING SVG
// const parser = new DOMParser();
// const carIcon = `<svg data-v-7554d3df="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-car-icon"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path><circle cx="7" cy="17" r="2"></circle><path d="M9 17h6"></path><circle cx="17" cy="17" r="2"></circle></svg>`;
// const pinSvg = parser.parseFromString(carIcon, 'image/svg+xml').documentElement;

// USING PNG
const carImgElement = document.createElement('img');
carImgElement.height = 50;
carImgElement.width = 50;
carImgElement.src = carImg;

onMounted(async () => {
  authStore.toggleLoader();
  try {
    const orderId = route.params.id;
    const existingOrder: any = inTransitOrders.value.data?.find(
      (elm: any) => elm.order_id === orderId
    );
    if (!existingOrder) {
      order.value = await driverStore.fetchOrderById(orderId);
    }
    else {
      order.value = existingOrder;
    }

    if (!order.value) {
      openToastNotification({
        message: `Order cannot be found`,
        variant: 'error',
        duration: 5000
      });
      return;
    }

    const collection = import.meta.env.DEV ? 'driver_location_staging' : 'driver_location';
    const docRef = doc(db, collection, order.value.driver_phone);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.updated_at) {
        const val = dayjs(data.updated_at.toDate()).format('ddd MMM DD YYYY HH:mm:ss A');
        console.log(data.updated_at.toDate())
        openToastNotification({
          message: `Last realtime update at: ${val}`,
          variant: 'success',
          duration: 0,
        });
      }

      unsubscribe = onSnapshot(
        doc(db, collection, order.value.driver_phone),
        (doc) => {
          const data: any = doc.data();

          if (data.coords) {
            position.value = {
              lat: data?.coords?.latitude,
              lng: data?.coords?.longitude
            }
          }          
        },
        (error) => {
          console.log(error);
          openToastNotification({
            message: `Firebase subscription error`,
            variant: 'error',
          })
        }
      );
      
    }
    else {
      openToastNotification({
        message: `Realtime tracking not available`,
        variant: 'error',
        duration: 0,
      });
    }

    // let count = 0
    // const intervalId = setInterval(function() {
    //   console.log('count interval')
    //   position.value = coordinates[count];
    //   count++;
    //   if (count === coordinates.length) {
    //     clearInterval(intervalId);
    //   }
    // }, 5000);
  } catch (error) {
    console.log(error);
  }
  authStore.toggleLoader();
});


onBeforeUnmount(() => {
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>

<style scoped lang="scss">
#map {
  min-height: 90vh
}
</style>