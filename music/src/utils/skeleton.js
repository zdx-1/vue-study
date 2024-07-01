import { reactive, watchEffect, h, render } from 'vue'

const state = reactive({
  // 加载状态
  loading: false,
  // 使用了 v-skeleton-item 指令的节点保存在这里
  list: []
})

watchEffect(() => {
  // 创建 vnode
  const children = state.list.map((el) =>
    h('div', {
      style: {
        position: 'absolute',
        top: el.getBoundingClientRect().top + 'px',
        left: el.getBoundingClientRect().left + 'px',
        width: el.getBoundingClientRect().width + 'px',
        height: el.getBoundingClientRect().height + 'px',
        background: 'hsla(0,0%,100%,0.1)',
        borderRadius: getComputedStyle(el).borderRadius,
      },
    })
  );

  // 创建 div 容器
  const container = h('div', { class: 'skeleton-container' }, children)

  // 将 div容器 渲染到 body 中
  render(state.loading ? container : null, document.body)
})

const Skeleton = {
  mounted(el, binding) {
    state.loading = binding.value
  },
  updated(el, binding) {
    state.loading = binding.value
  },
  unmounted(el) {
    state.loading = false
  }
}

const SkeletonItem = {
  mounted(el, binding) {
    // 保存 el
    state.list.push(el)
  },
  unmounted(el) {
    // 删除 el
    const i = state.list.indexOf(el)
    if (i == -1) return
    state.list.splice(i, 1)
  }
}

// 注册这2个指令
export default {
  install: app => {
    app.directive('skeleton', Skeleton)
    app.directive('skeleton-item', SkeletonItem)
  }
}

export { Skeleton, SkeletonItem }