<template>
  <div class="rounded">
    <button
      class="text-sm text-center rounded duration-150 flex items-center justify-center"
      :class="[
        typeEnum[type],
        sizeEnum[sizeKey].button,
        {
          'active:scale-105': isActiveAnim
        }
      ]"
      @click.stop="onButtonClick"
    >
      <!-- loading动画 -->
      <m-svgIcon v-if="loading" class="w-2 h-2 animate-spin mr-1"></m-svgIcon>
      <!-- icon按钮的icon -->
      <m-svgIcon
        v-if="icon"
        :name="icon"
        class="m-auto"
        :class="sizeEnum[sizeKey].icon"
        :color="iconColor"
        :fillClass="iconClass"
      ></m-svgIcon>
      <!-- 文字 -->
      <slot v-else></slot>
    </button>
  </div>
</template>

<script>
const EMITS_CLICK = 'click';
// type:可选项 按钮风格
const typeEnum = {
  primary:
    'text-white bg-gray-800 dark:bg-gray-900 hover:bg-gray-900 dark:hover:bg-gray-700 active:bg-gray-400 dark:active:bg-gray-700',
  main: 'text-white bg-vue-green dark:bg-gray-900 hover:bg-vue-gray dark:hover:bg-gray-700 active:bg-main dark:active:bg-gray-700',
  info: 'text-gray-800 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-200 dark:active:bg-gray-700'
};
// size：可选项 按钮大小,区分文字和icon button
const sizeEnum = {
  // text button
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-7 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
};
</script>

<script setup>
import { computed } from 'vue';
import mSvgIcon from '../svgIcon/index.vue';
/**
 * 构建风格和大小可选项
 * 区分icon button和text button
 * 实现展示
 * 处理事件
 */
const props = defineProps({
  // icon图标
  icon: String,
  // icon颜色
  iconColor: String,
  // icon类名
  iconClass: String,
  // 按钮风格
  type: {
    type: String,
    default: 'main',
    validator(val) {
      // 获取所有的可选项
      const keys = Object.keys(typeEnum);
      // 判断传入的选项是否在可选项中
      const res = keys.includes(val);
      if (!res) {
        throw new Error(`传入的type必须为${keys.join('、')}中的其中一种`);
      }
      return res;
    }
  },
  // 按钮大小
  size: {
    type: String,
    default: 'default',
    validator(val) {
      // 获取所有的可选项
      const keys = Object.keys(sizeEnum).filter((k) => !k.includes('icon'));
      // 判断传入的选项是否在可选项中
      const res = keys.includes(val);
      if (!res) {
        throw new Error(`传入的size必须为${keys.join('、')}中的其中一种`);
      }
      return res;
    }
  },
  //  按钮点击是否动画
  isActiveAnim: {
    type: Boolean,
    default: true
  },
  //   loading效果
  loading: {
    type: Boolean,
    default: false
  }
});
const emits = defineEmits([EMITS_CLICK]);
// 点击事件
const onButtonClick = () => {
  if (props.loading) return;
  emits(EMITS_CLICK);
};
// 要是传了icon就使用icon-default样式
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size;
});
</script>
