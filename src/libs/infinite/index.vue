<template>
  <div>
    <!-- 内容 -->
    <slot></slot>
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svgIcon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svgIcon>
      <!-- 没有更多数据 -->
      <p v-if="isFinished" class="text-center text-base text-gray-400">
        没有更多数据了！
      </p>
    </div>
  </div>
</template>

<script setup>
import { useVModel, useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    reuqired: true
  },
  //   数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits(['onLoad', 'update:modelValue']);

const loading = useVModel(props);

// 滚动的元素
const loadingTarget = ref(null);
useIntersectionObserver(loadingTarget, ([isIntersecting]) => {
  console.log('loading可见');
  if (isIntersecting && !loading.value && !props.isFinished) {
    //   // 当前loading可见
    loading.value = true;
    emits('onLoad');
  }
});
</script>
