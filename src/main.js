/*
 * @Author: luo_h603
 * @Date: 2022-07-14 16:29:45
 * @LastEditTime: 2022-07-14 16:36:45
 * @LastEditors: luo_h603
 * @Description: 
 * God help those who help themselves
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// element_ico注册
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store).use(router).use(ElementPlus).mount('#app')