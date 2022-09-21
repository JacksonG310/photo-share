<template>
  <div class="bg-white dark:bg-zinc-800 sticky top-0 left-0 w-full z-10">
    <ul
      class="w-800px relative flex flex-wrap justify-center overflow-x-auto overflow-y-hidden px-[10px] py-1 text-xs text-zinc-400 duration-300 overflow-hidden mx-auto"
      :class="isOpen ? 'h-206px' : 'h-56px'"
    >
      <!-- 小箭头 -->
      <div
        class="absolute right-1 bottom-1 z-10 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="triggerState"
      >
        <m-svgIcon
          :name="isOpen ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svgIcon>
      </div>
      <!-- 菜单项 -->
      <li
        v-for="(item, index) in $store.getters.categoryData"
        :key="item.id"
        class="flex-shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900':
            $store.getters.currentCategoryIndex === index
        }"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
// 控制下拉
const isOpen = ref(false);
const triggerState = () => {
  isOpen.value = !isOpen.value;
};
// 选中状态处理
const store = useStore();
const onItemClick = (item) => {
  store.dispatch('app/useCurrentCategory', item);
};
</script>

<style lang="scss" scoped></style>
