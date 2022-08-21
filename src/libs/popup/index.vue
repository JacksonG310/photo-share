<template>
  <div>
    <teleport to="body">
      <transition name="fade">
        <!-- 蒙版 -->
        <div
          class="w-screen h-screen bg-gray-900 bg-opacity-60 z-40 fixed top-0 left-0"
          v-if="modelValue"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <transition name="pop-down-up">
        <!-- 内容 -->
        <div
          class="w-screen bg-white dark:bg-gray-800 z-50 fixed bottom-0"
          v-bind="$attrs"
          v-if="modelValue"
        >
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { useScrollLock } from '@vueuse/core';
import { watch } from 'vue';
// 双向绑定
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});
const emits = defineEmits(['update:modelValue']);

// 锁定body滚动
const isLocked = useScrollLock(document.body);
watch(
  () => props.modelValue,
  (value) => {
    isLocked.value = value;
  },
  {
    immediate: true
  }
);
</script>
<style lang="scss">
// 进来过程
.fade-enter-active,
// 离开过程
.fade-leave-active {
  transition: all 0.3s;
}
// 开始进来和离开完成的回调
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-down-up-enter-active,
.pop-down-up-leave-active {
  transition: all 0.3s;
}

.pop-down-up-enter-from,
.pop-down-up-leave-to {
  transform: translateY(100%);
}
</style>
