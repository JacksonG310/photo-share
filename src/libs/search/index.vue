<template>
  <div
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-vue-green hover:bg-opacity-10"
    ref="searchCantainer"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svgIcon
        class="w-1.5 h-1.5 absolute transform -translate-y-1/2 top-1/2 left-2"
        name="search"
        color="#707070"
      ></m-svgIcon>
      <!-- 输入框 -->
      <input
        class="block w-full h-44px pl-4 outline-none bg-gray-50 rounded-xl text-black text-sm tracking-wide font-semibold border border-gray-300 focus:border-red-300 duration-500 group-hover:bg-white"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @focus="onInputFocus"
        @blur="onInputBlur"
        @keyup.enter="onSearchClick"
      />
      <!-- 删除按钮 -->
      <m-svgIcon
        v-show="inputValue"
        class="h-1.5 w-1.5 absolute top-1/2 transform -translate-y-1/2 right-9 cursor-pointer duration-500"
        name="input-delete"
        @click="onClearClick"
      ></m-svgIcon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-px absolute top-1/2 transform bg-gray-500 -translate-y-1/2 right-7 duration-200 group-hover:opacity-100"
      ></div>
      <!-- 搜索按钮（通用组件） -->
      <m-button
        class="absolute top-1/2 transform -translate-y-1/2 right-1 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 duration-500"
        icon="search"
        iconColor="#fff"
        @click="onSearchClick"
      ></m-button>
    </div>
    <!-- 下拉框 -->
    <transition name="slider">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        id="slider"
        class="max-h-368px w-full text-base overflow-auto bg-white absolute z-20 left-0 top-6 p-2 rounded border border-gray-200 duration-200"
      >
        <slot name="dropdown"></slot>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useVModel, onClickOutside } from '@vueuse/core';

// 实现双向数据绑定
const props = defineProps({
  modelValue: {
    required: true,
    type: String
  }
});
const emits = defineEmits([
  'update:modelValue',
  'handleSearch',
  'clear',
  'input',
  'focus',
  'blur'
]);
const inputValue = useVModel(props);

// 点击清空按钮
const onClearClick = () => {
  inputValue.value = '';
  // 文本清空事件
  emits('clear', '');
};

// 处理搜索事件
const onSearchClick = () => {
  emits('handleSearch', inputValue.value);
};

// 获得焦点显示下拉框
const isFocus = ref(false);
const searchCantainer = ref(null);
const onInputFocus = () => {
  isFocus.value = true;
  // 获取焦点事件
  emits('focus');
};
onClickOutside(searchCantainer, () => {
  isFocus.value = false;
});

// 失去焦点事件
const onInputBlur = () => {
  emits('blur');
};
// 输入事件
watch(inputValue, (val) => {
  emits('input', val);
});
</script>
<style lang="scss">
.slider-enter-from,
.slider-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}
#slider:hover {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}
</style>
