<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolID" :fill="color" :class="fillClass" />
  </svg>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  // 显示的svg
  name: {
    type: String,
    required: true
  },
  //  图标颜色
  color: {
    type: String
  },
  //   tailwindClass
  fillClass: {
    type: String
  }
});
// svg的名称
const symbolID = computed(() => `#icon-${props.name}`);
</script>
