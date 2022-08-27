<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <m-popover placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white border border-gray-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-l-white"
          @click="onItemClick"
        >
          <m-svgIcon name="guide" class="w-2 h-2"></m-svgIcon>
        </div>
      </template>
      <p class="text-base">回到顶部</p>
    </m-popover>
  </div>
</template>

<script setup>
const onItemClick = () => {
  const mainTarget = document.getElementById('main');
  if (!mainTarget.scrollTop) return;
  mainTarget.scrollTop = 0;
};
</script>
