<template>
  <div class="bg-white rounded pb-1">
    <div
      class="relative w-full rounded group"
      :style="{ backgroundColor: randomRGB() }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        v-lazy
        class="w-full rounded bg-transparent"
        ref="imgTarget"
        :src="data.photo"
        alt=""
        :style="{
          height: (width / data.photoWidth) * data.photoHeight + 'px'
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="opacity-0 w-full h-full bg-gray-900 absolute top-0 left-0 rounded duration-300 group-hover:bg-opacity-50 group-hover:opacity-100 xl:block"
        v-show="!isMobile"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-gray-900"
        ></m-button>
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-gray-100 bg-opacity-70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-gray-900"
          @click="onDownload"
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-gray-100 bg-opacity-70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-gray-900"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-gray-900 px-1">{{ data.title }}</p>
    <!-- 作者信息 -->
    <div class="flex item-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-gray-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<script setup>
import { randomRGB } from '@/utils/color';
import { isMobile } from '@/utils/isMobile';
import { saveAs } from 'file-saver';
import { message } from '@/libs/message/index.js';
import { useElementBounding, useFullscreen } from '@vueuse/core';
import { ref, computed } from 'vue';
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number
  }
});

const emits = defineEmits(['click']);
// 下载图片
const onDownload = () => {
  message('success', '正在请求下载');
  setTimeout(() => {
    saveAs(props.data.photoDownLink);
  }, 1000);
};
// 全屏
const imgTarget = ref(null);
const { enter: onImgFullScreen } = useFullscreen(imgTarget);

// 当前进入详情的id
const {
  x: imgCantainerX,
  y: imgCantainerY,
  top,
  width: imgCantainerWidth,
  height: imgCantainerHeight
} = useElementBounding(imgTarget);

// pins跳转记录，记录图片的中心点
const imgCantainerCenter = computed(() => {
  return {
    translateX: parseInt(imgCantainerX.value + imgCantainerWidth.value / 2),
    translateY: parseInt(imgCantainerY.value + imgCantainerHeight.value / 2)
  };
});

// 点击展开详情
const onToPinsClick = (e) => {
  emits('click', {
    id: props.data.id,
    location: imgCantainerCenter.value
  });
};
</script>
