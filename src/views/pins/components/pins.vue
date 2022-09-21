<template>
  <div
    class="fixed top-0 left-0 w-screen h-screen text-xl z-20 backdrop-filter backdrop-blur-4xl bg-transparent dark:bg-zinc-800 pb-2 overflow-y-auto xl:p-2"
  >
    <!-- 移动端 -->
    <m-navBar v-if="isMobile" :sticky="true">
      {{ pexels.title }}
      <template #right>
        <m-svgIcon name="share" class="w-3 h-3"></m-svgIcon>
      </template>
    </m-navBar>
    <!-- PC端 -->
    <m-svgIcon
      v-else
      name="close"
      class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm bg-zinc-100 absolute right-2 top-2"
      @click="onPop"
    ></m-svgIcon>
    <!-- 内容 -->
    <div
      v-if="pexels.photo"
      class="xl:w-4/5 xl:h-full xl:m-auto xl:rounded-lg xl:flex"
    >
      <!-- 图片 -->
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexels.photo"
        alt=""
      />
      <div
        class="xl:w-2/5 xl:h-full xl:dark:bg-zinc-900 xl:bg-white xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <!-- PC端收藏、分享 -->
        <div v-if="!isMobile" class="flex justify-between mb-2">
          <m-svgIcon
            name="share"
            class="w-4 h-4 cursor-pointer hover:bg-zinc-200 duration-300 rounded"
          ></m-svgIcon>
          <m-button type="info" icon="heart"></m-button>
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexels.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center px-1 mt-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexels.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexels.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { getPexeplsById } from '@/api/pexels';
import { isMobile } from '@/utils/isMobile';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const pexels = ref({});
const getPexeplsDataById = async (id) => {
  const res = await getPexeplsById(id);
  pexels.value = res;
};
getPexeplsDataById(props.id);

// 关闭按钮
const router = useRouter();
const onPop = () => {
  router.back();
};
</script>
