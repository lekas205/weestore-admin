import vue from "vue";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $formatAsMoney: (key: number, currency?: boolean) => string;
  }
}
declare module "html2pdf.js";

declare module "vue3-html2pdf" {
  import vue3Html2pdf from "vue3-html2pdf";
  export = vue3Html2pdf;
}
