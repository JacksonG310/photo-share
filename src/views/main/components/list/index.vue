<template>
  <div>
    <!-- infinite组件 -->
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getPexeplsData"
    >
      <!-- waterfall组件 -->
      <m-waterfall
        class="px-1 w-full"
        :data="pexelsList"
        nodeKey="id"
        :columns="isMobile ? 2 : 5"
        :picturePreLoading="false"
      >
        <template v-slot="{ item, width }">
          <Item :data="item" :width="width" />
        </template>
      </m-waterfall>
    </m-infinite>
  </div>
</template>

<script setup>
import { isMobile } from '@/utils/isMobile';
import { getPexeplsList } from '@/api/pexels';
import { ref } from 'vue';
import Item from './item.vue';
let query = {
  page: 0,
  size: 1
};
const loading = ref(false);
const isFinished = ref(false);
// 请求图片数据
const pexelsList = ref([]);
const getPexeplsData = async () => {
  if (isFinished.value) return;
  //   完成第一次请求后，后续请求page都要先加一
  if (pexelsList.value.length) {
    query.page += 1;
  }

  const pexelsData = await getPexeplsList(query);
  debugger;

  if (query.page === 0) {
    pexelsList.value = pexelsData.list;
  } else {
    pexelsList.value.push(...pexelsData.list);
  }
  loading.value = false;

  //   判断数据是否全部加载完成
  if (pexelsList.value.length === pexelsData.total) {
    isFinished.value = true;
  }
};
getPexeplsData();
</script>
