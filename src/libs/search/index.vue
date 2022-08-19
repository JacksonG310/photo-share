<template>
  <div
    class="relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100 hover:bg-opacity-40 group"
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
      />
      <!-- 删除按钮 -->
      <m-svgIcon
        class="h-1.5 w-1.5 absolute top-1/2 transform -translate-y-1/2 right-9 cursor-pointer duration-500"
        name="input-delete"
      ></m-svgIcon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-px absolute top-1/2 transform -translate-y-1/2 right-7 duration-200"
      ></div>
      <!-- 下拉框 -->
      <transition name="slider">
        <div
          class="max-h-368px w-full text-base overflow-auto bg-white absolute z-20 left-0 top-6 p-2 rounded border border-gray-200 duration-200 hover:shadow-2xl"
        >
          <slot name="dropdown"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.slilder-enter-from,
.slilder-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
.slilder-enter-active,
.slilder-leave-active {
  transition: all 0.5s;
}
</style>
