<template>
  <div>
    <m-waterfall data="" nodeKey="" column="" picturePreLoading="">
      <template v-slot="{ item, width }">
        <Item :data="item" />
      </template>
    </m-waterfall>
  </div>
</template>

<script setup>
import { getPexeplsList } from '@/api/pexels';
import { ref } from 'vue';
import Item from './item.vue';
let query = {
  page: 1,
  size: 20
};
// 请求图片数据
const pexelsList = ref([]);
const getPexeplsData = async () => {
  const pexelsData = await getPexeplsList(query);
  pexelsList.value = pexelsData.list;
};
getPexeplsData();
</script>
