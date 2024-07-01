import { createApp } from 'vue'
import './style.css'
import "tailwindcss/tailwind.css"
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from '@/router'
import './assets/css/index.less'
import './assets/icons/plays/iconfont.css'
import pinia from '@/stores'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import lazy from 'vue3-lazyload'
import { MotionPlugin } from '@vueuse/motion'
import { MouseMenuDirective } from '@howdyjs/mouse-menu';
import myImage from '@/components/myImage.vue'
createApp(App).use(router).use(pinia).use(MotionPlugin).directive('MouseMenu', MouseMenuDirective).component('myImage', myImage).use(VueVirtualScroller).use(lazy).mount('#app')
