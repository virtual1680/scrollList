import { App } from 'vue'
import QScrollList from './main.vue';
export default {
  install: (app: App): void => {
    app.component(QScrollList.name, QScrollList)
  }
}
