<template>
  <div>
    <div
      v-for="(item, index) in suggestData"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
      @click="onItemClick(item)"
      v-html="highlightText(item)"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash';
import { getPexeplsSuggest } from '@/api/pexels';

const props = defineProps({
  // 搜索文本
  searchText: {
    type: String,
    required: true
  }
});

const emits = defineEmits(['search']);

// 获取搜索关键值
const suggestData = ref([]);
const getSuggestData = async () => {
  if (!props.searchText) return;
  let res = await getPexeplsSuggest(props.searchText);

  suggestData.value = res;
};
// 点击推荐项
const onItemClick = (item) => {
  emits('search', item);
};
// 处理高亮
const highlightText = (text) => {
  const highlightTag = `<span class='text-zinc-900 dark:text-zinc-200'>${props.searchText}</span>`;
  const reg = new RegExp(props.searchText, 'gi');
  return text.replace(reg, highlightTag);
};
watch(() => props.searchText, debounce(getSuggestData, 500), {
  immediate: true
});
</script>
