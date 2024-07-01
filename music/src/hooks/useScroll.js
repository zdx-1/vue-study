import { ref, onUnmounted, onMounted, onActivated, onDeactivated } from 'vue';
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 10) {
      isReachBottom.value = true
    }
    console.log('scrollListenerHandler', scrollHeight.value, scrollTop.value, isReachBottom.value);
  }, 100)
  
  onMounted(() => {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  onActivated(()=> {
    if (elRef) el = elRef.value
    el.addEventListener("scroll", scrollListenerHandler)
  })
  onDeactivated(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
