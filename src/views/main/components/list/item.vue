<template>
  <div class="bg-white rounded pb-1 h-28 w-32">
    <h1>{{ data.title }}</h1>
    <div class="relative w-full rounded group">
      <!-- 图片 -->
      <img class="w-full rounded bg-transparent" :src="data.photo" alt="" />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-gray-900 bg-opacity-30 absolute top-0 left-0 rounded duration-300 group-hover:bg-opacity-90 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top1.5 left-1.5">分享</m-button>
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
        ></m-button>
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-gray-100 bg-opacity-70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-gray-900"
        ></m-button>
      </div>
      <!-- 标题 -->
      <p class="text-sm mt-1 font-bold text-gray-900 px-1">{{ data.title }}</p>
      <!-- 作者信息 -->
      <div class="flex item-center mt-1 px-1">
        <img class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
        <span class="text-sm text-gray-500 ml-1">{{ data.author }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
});
</script>
