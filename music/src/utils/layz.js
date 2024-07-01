import { useIntersectionObserver } from '@vueuse/core'
import {ref} from "vue";

export const useLazyData = (target,apiFn) => {
    const result = ref([])
    // const target = ref(null)
    // stop 停止观察
    const { stop } = useIntersectionObserver(
        // 监听的目标元素
        target,
        ([{ isIntersecting }], observerElement) => {
            // isIntersecting 是否进入可视区
            if (isIntersecting) {
                stop()
                // 调用API函数获取数据
                apiFn()


                // 调用API函数获取数据  
		        apiFn().then(data => {
		          result.value = data.result
		        })
            }
        },
        // 配置选项，相交的比例大于0就触发
        {
            threshold: 0
        }
    )
    return { result, target }
}