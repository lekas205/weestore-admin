
import vue from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $formatAsMoney: (key: number, currency?: boolean) => string
  }
}
