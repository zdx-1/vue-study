<template>
  <div class="comments">
    <div class="title">
        <h2>{{ title }}</h2>
    </div>
    <template v-for="(item, index) in comments">
      <div class="item">
        <div class="imgBox">
          <!-- <img class="img" v-lazy="{ src: item.user?.avatarUrl, delay: 500  }" :title="item.user?.nickname" :alt="item.user?.nickname" /> -->
          <my-image class="img" :url="item.user?.avatarUrl" :title="item.user?.nickname" :alt="item.user?.nickname" />
          <!-- <el-image class="img" :src="item.user?.avatarUrl" fit="fill" :title="item.user?.nickname" :alt="item.user?.nickname"></el-image> -->
        </div>
        <div class="info">
          <div class="content text-sm">
            <span class="nickname inline-block mr-[6px]">{{ item.user?.nickname }}  : </span>
            <span class="songContent text-xs dark:text-white/90 text-black">
              {{ item.content }}
            </span>
          </div>

          <div class="beReplied my-[5px] py-[4px] rounded dark:bg-white/10 bg-black/10" v-if="item.beReplied.length">
            <template v-if="item.beReplied[0]?.content">
              <span class="nickname inline-block mr-[6px] text-[13px] pl-[10px]">{{ item.beReplied[0]?.user?.nickname }}  : </span>
              <span class="songContent text-xs dark:text-white/50 text-black/50">
                {{ item.beReplied[0]?.content }}
              </span>
            </template>
            <template v-else>
              <div class="null text-center dark:text-white/50 text-black/50">
                评论已删除
              </div>
            </template>
          </div>

          <div class="flex justify-between mt-[4px]">
            <div class="dark:text-white/50 text-black/50">
              {{ dayjs(item.time).format('YYYY年MM月DD日 hh:mm:ss', 'zh-cn') }}
            </div>
            
            <div class="cursor-pointer flex items-center text-xs px-[10px]" @click="likedCountClick(item,index)">
              <el-image v-show="item.liked" class="w-[14px] h-[14px] mr-[2px] " :src="getAssetsFile('plays/songContentT.png')" title="取消赞" fit="fill" ></el-image>
              <el-image v-show="!item.liked" class="w-[14px] h-[14px] mr-[2px]" :src="getAssetsFile('plays/songContentF.png')" title="点赞" fit="fill" ></el-image>
              <span v-if="item.likedCount">
                {{ item.likedCount }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup>
import { dayjs } from 'element-plus'
import { getAssetsFile } from '@/utils'
const props = defineProps({
  title: {
    type: String,
    default: () => ('默认标题')
  },
  comments: {
    type: Array,
    default: () => ([])
  }
})  
const emits = defineEmits(['likedCountClick'])
const likedCountClick = (res, index) => {
  emits('likedCountClick',res,index)
}
</script>

<style scoped lang="less">
.comments{
 margin-bottom: 30px;
}

.title{
  margin: 10px 0;
}

.item{
  display: flex;
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
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    .content{
      // font-size: 14px;
      .nickname{
        // display: inline-block;
        // margin-right: 6px;
      }
      .songContent{
        // font-size: 12px;
        // color: rgba(255, 255, 255, 0.85);
      }
    }

    .beReplied{
      // margin: 5px 0;
      // padding: 4px 0;
      // border-radius: 4px;
      // background-color: rgba(255, 255, 255, 0.1);
      .nickname{
        // display: inline-block;
        // margin-right: 6px;
        // font-size: 13px;
        // display: inline-block;
        // padding-left: 10px;
      }
    }
    
  }

}
</style>
