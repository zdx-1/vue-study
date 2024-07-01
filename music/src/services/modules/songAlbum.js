import hyRequest from '../request'

// 获取专辑内容
export function getAlbum(id) {
  return hyRequest.get({
    url: `/album?id=${id}`
  })
}
// 获取专辑评论
export function getCommentAlbum(id, data = {
  offset: 0,
  limit: 30
}) {
  console.log(id, data);
  return hyRequest.get({
    url: `/comment/album?id=${id}&offset=${data.offset}&limit=${data.limit}`
  })
}


