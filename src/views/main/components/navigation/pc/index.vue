<template>
  <div class="bg-white dark:bg-gray-800 sticky top-0 left-0 w-full z-10">
    <ul
      class="w-800px relative flex flex-wrap justify-center overflow-x-auto overflow-y-hidden px-[10px] py-1 text-xs text-gray-400 duration-300 overflow-hidden mx-auto"
      :class="isOpen ? 'h-206px' : 'h-56px'"
    >
      <!-- 小箭头 -->
      <div
        class="absolute right-1 bottom-1 z-10 p-1 rounded cursor-pointer duration-200 hover:bg-gray-200 dark:hover:bg-gray-900"
        @click="triggerState"
      >
        <m-svgIcon
          :name="isOpen ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-gray-900 dark:fill-gray-300"
        ></m-svgIcon>
      </div>
      <!-- 菜单项 -->
      <li
        v-for="(item, index) in $store.getters.categoryData"
        :key="item.id"
        class="flex-shrink-0 px-1.5 py-0 z-10 duration-200 text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-gray-200 dark:bg-gray-900 rounded mr-1 mb-1"
        :class="{
          'text-gray-900 dark:text-gray-200 bg-gray-200 dark:bg-gray-900':
            currentCategoryIndex === index
        }"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// 控制下拉
const isOpen = ref(false);
const triggerState = () => {
  isOpen.value = !isOpen.value;
};
// 选中状态处理
const currentCategoryIndex = ref(0);
const onItemClick = (index) => {
  currentCategoryIndex.value = index;
};
</script>

<style lang="scss" scoped></style>
