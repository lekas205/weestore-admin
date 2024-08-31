import { formatAsMoney } from "@/utils"
import { App } from "vue";

export default {
  install(app: App): any {
    app.config.globalProperties.$formatAsMoney = formatAsMoney;
  }
}
