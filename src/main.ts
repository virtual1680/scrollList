import { createApp } from 'vue'
import App from './App.vue'
import QScrollList from "../dist/q-scroll-list.es.js";
import "../dist/index.css";
createApp(App).use(QScrollList).mount('#app')
