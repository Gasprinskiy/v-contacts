import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/'
import VueTheMask from 'vue-the-mask'

createApp(App)
.use(VueTheMask)
.use(router)
.mount('#app')
