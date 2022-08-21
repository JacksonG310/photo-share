<template>
  <div class="bg-white dark:bg-gray-900 sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-gray-600"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-22px bg-black dark:bg-gray-800 rounded-lg duration-200"
      ></li>
      <!-- 右侧按钮 -->
      <li
        class="fixed top-0 -right-px h-4 px-1 flex items-center bg-white dark:bg-gray-900 z-20 shadow-l-white dark:shadow-l-gray"
        @click="handleShowPopup"
      >
        <m-svgIcon
          name="hamburger"
          class="w-1.5 h-1.5"
          color="black"
        ></m-svgIcon>
      </li>
      <li
        v-for="(item, index) in $store.getters.categoryData"
        :key="item.id"
        class="flex-shrink-0 px-1.5 py-0.5 z-10 duration-200"
        :class="{
          'text-white': currentCategoryIndex === index,
          'mr-4': index === $store.getters.categoryData.length - 1
        }"
        :ref="setItem"
        @click="handleItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <m-popup v-model="isPopupVisible">
      <Menu @onMenuItemClick="handleMenuItemClick"></Menu>
    </m-popup>
  </div>
</template>
<script setup>
import { useScroll } from '@vueuse/core';
import { ref, onBeforeUpdate, watch } from 'vue';
import Menu from '../../menu/index.vue';

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
});

// 点击改变index
const currentCategoryIndex = ref(0);
const handleItemClick = (index) => {
  currentCategoryIndex.value = index;
};

// 控制蒙版展示
const isPopupVisible = ref(false);
const handleShowPopup = () => {
  isPopupVisible.value = true;
};
// 获取所有元素的ref
let itemRefs = [];
const setItem = (el) => {
  if (el) {
    itemRefs.push(el);
  }
};

// 数据改变之后，DOM变化前触发
// 防止页面重新渲染后，重复push
onBeforeUpdate(() => {
  itemRefs = [];
});

// 获取ul滚动距离
const ulTarget = ref(null);
// useScroll获取响应式的滚动
const { x: ulScrollLeft } = useScroll(ulTarget);

// 监听currentCatetoryIndex
watch(currentCategoryIndex, (index) => {
  const { left, width } = itemRefs[index].getBoundingClientRect();
  // 滑块距离 = ul滚动距离 + 点选元素的偏移量 - ul的左padding
  const distance = ulScrollLeft.value + left - 10;

  sliderStyle.value = {
    transform: `translateX(${distance}px)`,
    width: `${width}px`
  };
});

// 处理菜单项的点击
const handleMenuItemClick = (index) => {
  currentCategoryIndex.value = index;
};
</script>
