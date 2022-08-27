<template>
  <div class="py-2 h-80vh flex flex-col">
    <h2 class="text-xl text-gray-900 dark:text-gray-200 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in $store.getters.categoryData"
        :key="item.id"
        class="text-lg text-gray-900 dark:text-gray-300 p-1 py-1.5 duration-100 active:bg-gray-100 dark:active:bg-gray-900"
        @click="$emit('onMenuItemClick', item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineEmits(['onMenuItemClick']);
</script>
