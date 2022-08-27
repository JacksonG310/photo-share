<template>
  <!-- 搜索栏 -->
  <div class="w-full">
    <m-search v-model="inputValue" @search="handleSearch">
      <template #dropdown>
        <!-- <suggest v-show="inputValue" :searchText="inputValue" /> -->
        <!-- 最近搜索 -->
        <history @search="handleSearch" v-show="!inputValue"></history>
        <!-- 推荐主题 -->
        <recomment v-show="!inputValue"></recomment>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import history from './history.vue';
import recomment from './recomment.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

let inputValue = ref('');
const store = useStore();
const handleSearch = (item) => {
  store.dispatch('search/useAddHistory', item);
  store.dispatch('app/useSearchText', inputValue);
};
</script>
