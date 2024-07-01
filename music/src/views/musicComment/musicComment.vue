<template>
  <div class="mt-5">
    <music-info :music-info="detailData"></music-info>
    <song_comment_area :info="detailData" :total="total" :comment-list="commentList" :hot-comment-list="hotCommentList"></song_comment_area>
  </div>
</template>

<script setup>
import musicInfo from './cpts/musicInfo.vue'
import myLoading from '@/components/myLoading.vue'
import { getCommentMusic, getAllPlaylistDetail } from '@/services'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import song_comment_area from '@/components/commentListBox/song_comment_area.vue'

const route = useRoute()
const router = useRouter()
let id = route.query.id

const total = ref(0)
const detailData = ref({})
const commentList = ref([])
const hotCommentList = ref([])
const getCommentMusicData = async () => {
  const res = await getCommentMusic({
    id
  })
  total.value = res.total
  commentList.value = res['comments']
  hotCommentList.value = res['hotComments']
}
getCommentMusicData()

const getAllPlaylistDetailData = async () => {
  const res = await getAllPlaylistDetail(id)
  detailData.value = res.songs[0]
}
getAllPlaylistDetailData()
</script>