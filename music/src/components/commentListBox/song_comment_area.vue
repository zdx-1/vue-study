<template>
  <div class="song_comment _area">
    <div class="hotComment">
      <comment-list-box @likedCountClick="likedCountClick" :title="'精彩评论'" :comments="hotCommentList"></comment-list-box>
    </div>
    <div class="comment">
      <comment-list-box @likedCountClick="likedCountClick" :title="`最新评论(${total})`" :comments="commentList"></comment-list-box>
    </div>
  </div>
</template>

<script setup>
import { setCommentlike } from '@/services'
import { dayjs } from 'element-plus'
import commentListBox from './commentList.vue';
const props = defineProps({
  commentList: {
    type: Array,
    default: () => ([])
  },
  hotCommentList: {
    type: Array,
    default: () => ([])
  },
  info: {
    type: Object,
    default: () => ({})
  },
  total: {
    type: Number
  },

})  
const likedCountClick = async (item, index) => {
  const data = {
    id: props.info.id,
    cid: item.commentId,
    type: props.info.creator?.avatarDetail?.identityLevel,
    t: item.liked ? 0 : 1
  }
  const res = await setCommentlike(data)
  if (res.code == 200) {
    item.liked = item.liked ? 0 : 1
    item.likedCount = item.liked == 0 ? item.likedCount - 1 : item.likedCount + 1
  }
}
const emits = defineEmits([''])
</script>

<style scoped lang="less">
.hotComment{
 
}

.title{
  margin: 10px 0;
}

.item{
  display: flex;
  align-items: center;
  padding: 10px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  .imgBox{
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden;
    width: 44px;
    height: 44px;
    .img{
      width: 44px;
      height: 44px;
    }
  }
 
  .info{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 12px;
    .content{
      font-size: 14px;
      .nickname{
        display: inline-block;
        margin-right: 6px;
      }
      .songContent{
        font-size: 12px;
        color: rgba(255, 255, 255, 0.9);
      }
    }
    
    .time{
      color: var(--hsla-05);
      text-decoration-color: var(--hsla-05);
    }
  }
}
</style>