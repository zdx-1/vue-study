export const sheetContextMenuOptions = {
  menuWrapperCss: {
    padding: '10px 0',
    background: 'var(--menuWrapperCssbgb)',
    lineColor: 'var(--menuWrapperCsslineColor)',
    boxShadow: 'var(--menuItemCssHoverbgd)',
    boxShadow: '0 0px 1px #888'
  },
  menuItemCss: {
    labelColor: 'var(--menuitem-color)',
    hoverBackground: 'var(--menuItemCssHoverbgd)'
  },
//   menuList:[
//   {
//     label: "查看歌单",
//     type: "查看歌单",
//     fn: (item) =>{
//       router.push(`/songSheet?id=${item.id}`)
//     }
//   },
//   {
//     label: "播放",
//     type: "播放",
//     fn: async (item) => {
//       const detailRes = await getPlaylistDetail(item.id)
      
//       if (detailRes.code == 200) {
//         const allId = detailRes['playlist']['trackIds'].map(item => item.id).join()
        
//         const allList = await getAllPlaylistDetail(allId)
//         playStore.playIndex = 0
//         playStore.playList = allList.songs
//         playStore.getPlayUrl(allList.songs[0])
//       }
//     }
//   },
//   {
//     label: "下一首播放",
//     type: "下一首播放",
//   },
//   {
//       line: true,
//   },
//   {
//     label: "收藏",
//     type: "收藏",
//   },
//   {
//     label: "发现...",
//     type: "发现...",
//   },
//   {
//     label: "复制链接",
//     type: "复制链接",
//   },
//   {
//       line: true,
//   },
//   {
//     label: "不感兴趣",
//     type: "不感兴趣",
//   },
// ]
}