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
          <Item :data="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>
    </m-infinite>
    <!-- 详情内容 -->
    <transition
      :css="false"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <pins v-if="isPinsVisible" :id="currentPins.id"></pins>
    </transition>
  </div>
</template>

<script setup>
import { isMobile } from '@/utils/isMobile';
import { getPexeplsList } from '@/api/pexels';
import { useEventListener } from '@vueuse/core';
import gsap from 'gsap';
import Item from './item.vue';
import pins from '@/views/pins/components/pins.vue';
import { useStore } from 'vuex';
import { ref, watch } from 'vue';
let query = {
  page: 1,
  size: 20
};
const loading = ref(false);
const isFinished = ref(false);
// 请求图片数据
const pexelsList = ref([]);
const getPexeplsData = async () => {
  if (isFinished.value) return;
  //   完成第一次请求后，后续请求page都要先加一
  if (pexelsList.value.length != 0) {
    query.page += 1;
  }

  const pexelsData = await getPexeplsList(query);
  console.log(pexelsData);
  if (query.page === 1) {
    console.log('第一次请求');
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
// 修改query对象重新发起请求
const resetQuery = (newQuery) => {
  console.log('重置状态');
  query = {
    ...query,
    ...newQuery
  };
  // 重置装态
  isFinished.value = false;
  pexelsList.value = [];
  // 只要数据一空，loading值就会可见，就会重新加载数据
};

// 控制pins的显示
const isPinsVisible = ref(false);
const currentPins = ref({});

// 监听浏览器后退方法
useEventListener(window, 'popstate', () => {
  isPinsVisible.value = false;
});
// 进入详情
const onToPins = (item) => {
  //修改url
  history.pushState(null, null, `/pins/${item.id}`);
  isPinsVisible.value = true;
  currentPins.value = item;
};

const beforeEnter = (el) => {
  // console.log(
  //   currentPins.value.location.translateX,
  //   currentPins.value.location?.translateY
  // );
  gsap.set(el, {
    // 元素缩放
    scaleX: 0,
    scaleY: 0,
    // 中心点
    transformOrigin: '0 0',
    // 将中心点移动至元素中央
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    opacity: 0
  });
};
const enter = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    onComplete: done,
    translateX: 0,
    translateY: 0
  });
};

const leave = (el, done) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.location?.translateX,
    translateY: currentPins.value.location?.translateY,
    onComplete: done
  });
};

// 监听当前选择标签的变化
const store = useStore();
watch(
  () => store.getters.currentCategory,
  (currentCategory) => {
    resetQuery({
      page: 1,
      categoryId: currentCategory.id
    });
  }
);
// 监听searchText的变化
watch(
  () => store.getters.searchText,
  (newValue) => {
    resetQuery({
      page: 1,
      keyword: newValue
    });
  }
);
</script>
