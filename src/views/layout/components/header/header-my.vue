<template>
  <div>
    <m-popover class="flex items-center" placement="bottom-left">
      <template #reference>
        <div
          class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:border-zinc-900"
        >
          <!-- 头像 -->
          <img v-lazy class="w-3 h-3 rounded-sm" src="@/assets/logo.png" />
          <!-- 小箭头 -->
          <m-svgIcon
            class="w-1.5 h-1.5 ml-0.5"
            name="down-arrow"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svgIcon>
          <!-- vip -->
          <m-svgIcon
            class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
            name="vip"
            fillClass="fill-zinc-900"
          ></m-svgIcon>
        </div>
      </template>
      <!-- 内容 -->
      <div class="w-140px overflow-hidden">
        <div
          v-for="item in menuEnum"
          :key="item.id"
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 bg-opacity-60"
        >
          <m-svgIcon
            :name="item.icon"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></m-svgIcon>
          <span class="text-zinc-800 text-sm dark:text-zinc-300">{{
            item.title
          }}</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<script setup>
const menuEnum = [
  {
    id: 0,
    title: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '升级 VIP',
    icon: 'vip-profile',
    path: '/member'
  },
  {
    id: 2,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
];
</script>
