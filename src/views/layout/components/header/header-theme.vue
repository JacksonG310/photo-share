<template>
  <div>
    <m-popover placement="bottom-left">
      <!-- 触发器 -->
      <template #reference>
        <m-svgIcon
          :name="svgIconName"
          class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-200 dark:hover:border-zinc-900 bg-opacity-60"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        >
        </m-svgIcon>
      </template>
      <!-- 内容 -->
      <div class="w-140px overflow-hidden">
        <div
          v-for="item in themeArr"
          :key="item.id"
          @click="onThemeItemClick(item)"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100 dark:bg-zinc-800 bg-opacity-60"
        >
          <m-svgIcon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svgIcon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.name
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();
const themeArr = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑'
  },
  {
    id: '0',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
];
const onThemeItemClick = (currentTheme) => {
  store.dispatch('theme/useThemeType', currentTheme.type);
};

const svgIconName = computed(() => {
  const findTheme = themeArr.find(
    (item) => item.type === store.getters.themeType
  );
  return findTheme.icon;
});
</script>
