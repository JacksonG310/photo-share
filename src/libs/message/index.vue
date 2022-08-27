<template>
  <transition name="down">
    <div
      v-show="isVisible"
      class="min-w-420px fixed top-2 left-1/2 transform -translate-x-1/2 z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="style[type].containerClass"
    >
      <m-svgIcon
        :name="style[type].icon"
        :color="style[type].color"
        class="w-1.5 h-1.5 mr-1.5"
      ></m-svgIcon>
      <span class="text-sm" :class="style[type].textClass"> {{ content }}</span>
    </div>
  </transition>
</template>

<script>
const SUCCESS = 'success';
const WARNNING = 'warnning';
const ERROR = 'error';
const typeEnum = [SUCCESS, WARNNING, ERROR];
</script>
<script setup>
import { ref, onMounted } from 'vue';
import mSvgIcon from '../svgIcon/index.vue';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator(val) {
      const res = typeEnum.includes(val);
      if (!res) {
        throw new Error(`传入的type必须是${typeEnum.join('、')}中的一个`);
      }
      return res;
    }
  },
  content: {
    type: String,
    required: true
  },
  //   持续时间
  duration: {
    type: Number
  },
  show: {
    type: Function
  },
  //   关闭回调
  close: {
    type: Function
  }
});
// 样式表
const style = {
  warnning: {
    icon: 'warn',
    color: '#DCA550',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200 hover:shadow-lg hover:shadow-warn-100'
  },
  error: {
    icon: 'error',
    color: '#f56c6c',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200 hover:shadow-lg hover:shadow-error-100'
  },
  success: {
    icon: 'success',
    color: '#7EC050',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200 hover:shadow-lg hover:shadow-success-100'
  }
};
// 控制展示
const isVisible = ref(false);
onMounted(() => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
    if (props.close) {
      props.close();
    }
  }, props.duration);
});
</script>
<style lang="scss">
// 进来过程
.down-enter-active,
// 离开过程
.down-leave-active {
  transition: all 0.5s;
}
// 开始进来和离开完成的回调
.down-enter-from,
.down-leave-to {
  transform: translate3d(-50%, -100px, 0);
  opacity: 0;
}

.down-enter-active,
.down-leave-active {
  transition: all 0.3s;
}
</style>
