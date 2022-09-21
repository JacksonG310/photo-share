<template>
  <div class="relative" @mouseleave="onMouseLeave" @mouseenter="onMouseEnter">
    <!-- 具名插槽，用于指定触发器内容 -->
    <div ref="referenceTarget">
      <slot name="reference"></slot>
    </div>
    <transition name="slider">
      <div
        ref="contentTarget"
        v-show="isVisible"
        class="absolute p-1 z-20 dark:bg-zinc-900 bg-white border dark:border-zinc-700 rounded-md"
        :style="contentStyle"
      >
        <!-- 指定弹出层内容 -->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 延迟关闭时间
const DELAY = 100;
// 位置
const PROP_TOP_LEFT = 'top-left';
const PROP_TOP_RIGHT = 'top-right';
const PROP_BOTTOM_LEFT = 'bottom-left';
const PROP_BOTTOM_RIGHT = 'bottom-right';

const placementEnum = [
  PROP_TOP_LEFT,
  PROP_TOP_RIGHT,
  PROP_BOTTOM_LEFT,
  PROP_BOTTOM_RIGHT
];
</script>
<script setup>
import { ref, watch, nextTick } from 'vue';
const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const res = placementEnum.includes(val);
      if (!res) {
        throw new Error(`placement必须是${placementEnum.join('、')}中的一个`);
      }
      return res;
    }
  }
});
const isVisible = ref(false);
let timer = null;
// 鼠标移入
const onMouseEnter = () => {
  isVisible.value = true;
  if (timer) clearTimeout(timer);
};
// 鼠标移出
const onMouseLeave = () => {
  timer = setTimeout(() => {
    isVisible.value = false;
    timer = null;
  }, DELAY);
};

// 计算元素尺寸
const referenceTarget = ref(null);
const contentTarget = ref(null);
const useElementSize = (target) => {
  if (!target) return {};
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  };
};
const contentStyle = ref({
  top: 0,
  left: 0
});
// 气泡展示的时候再计算
watch(isVisible, (val) => {
  if (!val) return;
  // 等待元素渲染
  nextTick(() => {
    const { width: Cwidth } = useElementSize(contentTarget.value);
    const { width: Rwidth, height: Rheight } = useElementSize(
      referenceTarget.value
    );
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0;
        contentStyle.value.left = -1 * Cwidth + 'px';
        break;
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0;
        contentStyle.value.left = Rwidth + 'px';
        break;
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = Rheight + 'px';
        contentStyle.value.left = -1 * Cwidth + 'px';
        break;
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = Rheight + 'px';
        contentStyle.value.left = Rwidth + 'px';
        break;
      default:
        break;
    }
  });
});
</script>
<style lang="scss">
.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.slider-enter-active,
.slider-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
</style>
