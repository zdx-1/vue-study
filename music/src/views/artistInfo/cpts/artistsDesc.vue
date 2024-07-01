<template>
  <div class="artistInfo">
    <template v-for="item in artistsDesc.introduction">
      <div class="item dark:text-white/70">
        <h2>{{ item.ti }}</h2>
        <!-- <div v-html="filterateStr(item.txt)"></div> -->
        <template  v-for="TxT in item.txt">
          <p >
            {{ TxT }}
          </p>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, toRefs, onMounted, computed, reactive, watch } from 'vue'
import { getAssetsFile } from '@/utils'
const props = defineProps({
  artistsDesc: {
    type: Object,
    default: () => ({})
  },
})
const filterateStr = str => {
  str += '  '
  console.log(str.replace(/\n/g,'<br>  '));
  return str.replace(/\n/g,'<br>  ')
}
</script>

<style scoped lang="less">
.artistInfo{
  .item{
    margin: 5px 0;
  }
  p{
    text-indent:2em;
    font-size: 12px;
    padding: 4px 0;
  }
}
</style>