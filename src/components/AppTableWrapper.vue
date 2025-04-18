<template>
  <div class="table-container">
    <div class="table-top">
      <div class="search-container">
        <div v-if="searchLabelText" class="search-input">
          <AppInput :label="searchLabelText" v-model:value="search" @keyup.enter="submit"/>
        </div>
        <button
          v-if="searchLabelText"
          :disabled="!search.length"
          class="table-btn search-btn"
          @click="submit"
        >
          Search
        </button>
        <v-btn
          size="large"
          variant="text"
          color="red"
          v-if="searched"
          class="table-btn"
          @click="clear"
        >
          Clear <X/>
        </v-btn>
      </div>
      <div class="action-container tw-gap-4 tw-items-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              size="large"
              color="black"
              v-bind="props"
              variant="outlined"
            >
            <Filter />
              Filter by
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              @click="filterTable(item.value)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn
          size="small"
          variant="text"
          color="red"
          @click="clearFilter"
          v-if="filter.length"
        >
          Clear filter
        </v-btn>

        <button
          v-if="createBtnText"
          class="table-btn green-btn"
          @click="$emit('create')"
        >
          <Plus class="mr-2" />
          {{ createBtnText }}
        </button>

        <button
          v-if="hasDelete"
          class="table-btn red-btn"
          @click="$emit('delete')"
        >
          <Trash2 class="mr-2" />
           Delete
        </button>

        <button
          class="table-btn search-btn"
          v-if="!noExport && !hasDelete"
          @click="openExportModal= true"
        >
          <Upload class="mr-2"/>
           Export
        </button>
      </div>
    </div>
    <slot />

    <AppCustomDateRange v-model:openModal="openModal" @proceed="filterByCustom($event)" />
    <AppExportModal v-model:openModal="openExportModal" @proceed="emit('export',$event)" :tableName="tableName" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Trash2 ,Filter, X, Upload} from 'lucide-vue-next'
import AppInput from '@/components/AppInput.vue'
import AppCustomDateRange from "@/components/AppCustomDateRange.vue";
import AppExportModal from "@/components/AppExportModal.vue";
import { getDateRange } from "@/utils";

const emit = defineEmits([
  'create', 
  'search', 
  'delete', 
  'export', 
  'filter'
]);

defineProps({
  searchLabelText: {
    type: String,
    required: false,
  },
  hasDelete: {
    type: Boolean,
    default: false
  },
  noExport: {
    type: Boolean,
    default: false
  },
  createBtnText: {
    type: String,
    required: false,
  },
  tableName:{
    type: String,
    required: false,
  }
});

const filter = ref("");
const search = ref("");
const searched = ref(false);
const openModal = ref(false);
const openExportModal = ref(false);

const submit = () => {
  searched.value = true;
  emit('search', search.value)
}

const clear = () => {
  searched.value = false;
  search.value = ""
  emit('search', search.value)
}

const clearFilter = () => {
  filter.value = ""
  emit('filter', {})
}

const  items =  ref([
  { title: 'Today', value: "today" },
  // { title: 'Past 3 days', value: "last3" },
  // { title: 'Past 7 days', value: "last7" },
  // { title: 'Past 2 weeks', value: "last14" },
  // { title: 'Last 30 days', value: "last30" },
  { title: 'Custom' , value: 'custom'},
])

const filterTable = (range:string) =>{
  filter.value = range
  if(range === 'custom') return openModal.value = true;
  emit('filter',{ start_date: getDateRange(range), end_date: getDateRange('today')});
}
const filterByCustom = (payload:any) => {
  emit('filter',{ ...payload});
  openModal.value = false
}


</script>

<style lang="scss" scoped>
.table-top {
  display: flex;
  justify-content: space-between;
  background-color: white;
  margin-bottom: 1.5rem;
  padding: 1rem;
}

.search-container {
  flex: 0 0 40%;
  display: flex;
  align-items: flex-end;
}

.action-container {
  flex: 0 0 50%;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  flex: 0 0 70%;
  margin-right: 1rem;
}
</style>