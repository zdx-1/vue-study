import { defineStore } from 'pinia'

const usePageStore = defineStore('page', {
  state: () => ({
    pageHeight: '80px',
    footerState: true,
    effect: 'dark',
    arrivedState: {}
  }),
  actions: {

  },
})

export default usePageStore
