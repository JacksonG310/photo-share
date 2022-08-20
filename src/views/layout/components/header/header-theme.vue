<template>
  <div>
    <m-popover placement="bottom-left">
      <!-- 触发器 -->
      <template #reference>
        <m-svgIcon
          name="theme-light"
          class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-gray-200 bg-opacity-60"
          fillClass="fill-gray-600"
        >
        </m-svgIcon>
      </template>
      <!-- 内容 -->
      <div class="w-140px overflow-hidden">
        <div
          v-for="item in themeArr"
          :key="item.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-gray-100 bg-opacity-60"
        >
          <m-svgIcon :name="item.icon" class="w-1.5 h-1.5 mr-1"></m-svgIcon>
          <span class="text-gray-800 text-sm">{{ item.name }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants';
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
</script>
