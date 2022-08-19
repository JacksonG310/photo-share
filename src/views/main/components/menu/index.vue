<template>
  <div class="py-2 h-80vh flex flex-col">
    <h2 class="text-xl text-gray-900 font-bold mb-2 px-1">所有分类</h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in categoryData"
        :key="item.id"
        class="text-lg text-gray-900 p-1 py-1.5 duration-100 active:bg-gray-100"
        @click="$emit('onMenuItemClick', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
defineProps({
  categoryData: {
    type: Array,
    required: true
  }
});
defineEmits(['onMenuItemClick']);
</script>
