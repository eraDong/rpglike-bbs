import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from '@/stores/index'
import '@/assets/less/common.less'
import 'element-plus/theme-chalk/el-message.css'

// loading
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
