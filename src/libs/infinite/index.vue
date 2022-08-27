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
import { ref, watch } from 'vue';
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

// loading元素
const loadingTarget = ref(null);
// loading当前是否在底部
const isLoadingTargetIntersection = ref(false);

useIntersectionObserver(loadingTarget, ([IntersectionObserverEntry]) => {
  let { isIntersecting } = IntersectionObserverEntry;
  isLoadingTargetIntersection.value = isIntersecting;
  emitLoad();
});

const emitLoad = () => {
  setTimeout(() => {
    if (
      isLoadingTargetIntersection.value &&
      !loading.value &&
      !props.isFinished
    ) {
      //   // 当前loading可见
      loading.value = true;
      emits('onLoad');
    }
  }, 500);
};
// 解决首屏未铺满
watch(loading, () => {
  console.log('loading变化');
  emitLoad();
});
</script>
