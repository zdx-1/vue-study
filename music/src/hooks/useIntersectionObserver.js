import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'


export const useLazyData = (el, options) => {
  const { stop } = useIntersectionObserver(el, async ([{ isIntersecting }]) => {
    options.startFn && await options.startFn()
    if (isIntersecting) {

      options.endFn && options?.endFn(el)
      options.fn && options.fn(el)
      stop()
      
      // 取消监听组件进入视图区域这一行为
        
     }
   },
   // 配置选项，相交的比例大于0就触发
   {
       threshold: 0
   })
  // return { goods, target }
}

