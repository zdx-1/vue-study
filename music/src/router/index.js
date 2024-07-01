import { createRouter, createWebHashHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import { indexChildrensRouter } from './modules/home'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const pages = import.meta.glob('../views/*/*.vue')
const nos = ['/VIDEODETAILS']
let indexComponent = null
let routes = [
  {
    path: '/',
    redirect: "/index/personalizedMuicList",
  }
]
routes = [ ...routes , ... (Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/views\/(.*)\/(.*)\.vue$/)[1].toLowerCase();
  const routePath = `/${name}`;
  // console.log(routePath);
  if (routePath === '/index') {
    return {
      path: routePath,
      name,
      redirect: "/index/personalizedMuicList",
      components: {
        default: pages[path],
        myAside: () => import('@/components/myAside/myAside.vue'),
        myFooter: () => import('@/components/myFooter/myFooter.vue'),
        myHeader: () => import('@/components/myHeader/myHeader.vue'),
      },
      children: indexChildrensRouter
    }  
  }
  // console.log(nos.includes(name.toUpperCase()), name);
  if (nos.includes(routePath.toUpperCase())) {
    return {
      path: routePath,
      name,
      components: {
        default: pages[path],
        myHeader: () => import('@/components/myHeader/myHeader.vue'),
      },
    }
  }
  else {
   return {
      path: routePath,
      name,
      components: {
        default: pages[path],
        myAside: () => import('@/components/myAside/myAside.vue'),
        myFooter: () => import('@/components/myFooter/myFooter.vue'),
        myHeader: () => import('@/components/myHeader/myHeader.vue'),
      },
    }   
  }
}))]

// routes.push(
//   {
//     path: '/:pathMatch(.*)*',
//     components: { 
//       default: () => import('@/views/index/index.vue'),
//       myAside: () => import('@/components/myAside/myAside.vue'),
//       myFooter: () => import('@/components/myFooter/myFooter.vue'),
//       myHeader: () => import('@/components/myHeader/myHeader.vue'),
//     }
//   },
// )
// console.log("routes", routes);
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const cookie = localStorage.getItem('cookie')
//   if (to.meta.auth) {
//     if (!cookie) {
//       ElMessage({
//         message: '请先登入.',
//         type: 'warning',
//       })
//       next('/index')
//     } else {
//       next()
//     }
  	
//   } else {
//     next()
//   }
// })
router.beforeEach((to,from,next)=>{ 
  NProgress.start() 
  next()
}) 
router.afterEach((to,from,next)=>{ 
  NProgress.done() 
})
export default router