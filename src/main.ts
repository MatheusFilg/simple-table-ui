import { createApp } from 'vue'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import '../src/global.css'

createApp(App).use(VueQueryPlugin).mount('#app')
