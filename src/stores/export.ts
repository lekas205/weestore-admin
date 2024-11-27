import { ref } from "vue";
import { defineStore } from "pinia";

export const useExportStore = defineStore("export", () => {
  const dataToExport = ref<any>([]);

  const storeData = (data: any): void => {
    dataToExport.value = data;
  };
  return {
    dataToExport,
    storeData,
  };
});
