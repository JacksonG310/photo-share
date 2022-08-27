<template>
  <div>
    <div class="flex items-center text-xs mb-1 text-gray-400">
      <!-- 最近搜索 -->
      <span>最近搜索</span>
      <!-- icon -->
      <m-svgIcon
        name="delete"
        class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 hover:bg-gray-100"
        fillClass="fill-gray-300"
        @click.stop="onDeleteAll"
      ></m-svgIcon>
    </div>
    <!-- 数据 -->
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in $store.getters.history"
        :key="index"
        class="mr-2 mb-1.5 flex items-center cursor-pointer bg-gray-100 px-1.5 py-0.5 text-gray-900 font-bold rounded-sm duration-300 hover:bg-gray-200"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svgIcon
          name="input-delete"
          class="h-1.5 w-1.5 rounded-sm duration-300 hover:bg-gray-100"
          @click.stop="onDeleteHistory(index)"
        ></m-svgIcon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { confirm } from '@/libs';

const emits = defineEmits(['search']);
const store = useStore();
const onDeleteAll = () => {
  confirm('标题', '确定删除所有历史记录吗？')
    .then(() => {
      store.dispatch('search/useDeleteAllHistory');
    })
    .catch(() => {
      console.log('点击了取消');
    });
};
const onDeleteHistory = (index) => {
  store.dispatch('search/useDeleteHistory', index);
};
// 触发搜索
const onItemClick = (item) => {
  emits('search', item);
};
</script>
