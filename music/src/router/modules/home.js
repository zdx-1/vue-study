import { indexTabsMock } from '@/mock'

const childrens = [

]

export const indexChildrensRouter = indexTabsMock.map(item => {
  return {
    name: item.name,
    path: item.name,
    components: {
      default: () => import('@/views/index/index.vue'),
      myAside: () => import('@/components/myAside/myAside.vue'),
      myFooter: () => import('@/components/myFooter/myFooter.vue'),
      myHeader: () => import('@/components/myHeader/myHeader.vue'),
    },
  }
})

console.log('indexRouter',indexChildrensRouter, indexTabsMock);