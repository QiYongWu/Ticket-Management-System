import { createApp } from 'vue'
import App from './App.vue'
import {router} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {install} from '@icon-park/vue-next/es/all';

const app = createApp(App)
app.use(router);
app.use(ElementPlus)
install(app);

app.mount('#app')
