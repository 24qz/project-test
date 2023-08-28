import 'vant/lib/index.css'
import './styles/main.scss'
import persist from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'virtual:svg-icons-register'
const app = createApp(App)
app.use(router)
app.use(createPinia().use(persist))
app.mount('#app')
