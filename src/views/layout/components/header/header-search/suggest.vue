<template>
  <div></div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getPexeplsSuggest } from '@/api/pexels';

const props = defineProps({
  // 搜索文本
  searchText: {
    type: String,
    required: true
  }
});
// 获取搜索关键值
const suggestData = ref([]);
const getSuggestData = async () => {
  if (!props.searchText) return;
  const res = await getPexeplsSuggest(props.searchText);
  console.log(res);
};
watch(
  () => props.searchText,
  () => {
    getSuggestData();
  },
  {
    immediate: true
  }
);
</script>
