<template>
  <div>
    <!-- 蒙版 -->
    <transition name="fade">
      <div
        v-if="isVisible"
        class="w-screen h-screen bg-gray-900 bg-opacity-60 z-40 fixed top-0 left-0"
        @click="onFadeClick"
      ></div>
    </transition>
    <!-- 内容 -->
    <transition name="up">
      <div
        v-if="isVisible"
        class="w-4/5 fixed top-1/3 left-1/2 transform -translate-x-1/2 z-50 px-2 py-1.5 rounded-sm border cursor-pointer bg-white xl:w-35%"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-gray-900 m-2">{{ title }}</div>
        <!-- 文本 -->
        <div class="text-base text-gray-900">{{ content }}</div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import mButton from '../button';
import { ref, onMounted } from 'vue';
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 描述
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮事件
  confirmHandler: {
    type: Function
  },
  // 关闭的回调
  closeHandler: {
    type: Function
  }
});
// 控制组件显示
const isVisible = ref(false);
const show = () => {
  isVisible.value = true;
};
// 关闭动画的执行时间
const duration = '0.5s';
// 关闭蒙版
const onFadeClick = () => {
  onClose();
};
// 取消按钮点击
const onCancelClick = () => {
  if (props.cancelHandler) {
    props.cancelHandler();
  }
  onClose();
};
// 确定按钮点击
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler();
  }
  onClose();
};
// 关闭组件
const onClose = () => {
  isVisible.value = false;
  // 等待动画执行完成再销毁组件
  setTimeout(() => {
    if (props.closeHandler) {
      props.closeHandler();
    }
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100);
};
onMounted(() => {
  show();
});
</script>
<style lang="scss">
// 进来过程
.fade-enter-active,
// 离开过程
.fade-leave-active {
  transition: all v-bind(duration);
}
// 开始进来和离开完成的回调
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
