<template>
  <!-- 搜索栏 -->
  <div class="w-full">
    <m-search v-model="inputValue" @search="handleSearch">
      <template #dropdown>
        <!-- 搜索词推荐 -->
        <suggest
          v-show="inputValue"
          :searchText="inputValue"
          @search="handleSearch"
        />
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
import suggest from './suggest.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

let inputValue = ref('');
const store = useStore();
/**
 * 搜索回调
 */
const handleSearch = async (item) => {
  inputValue.value = item;
  store.dispatch('search/useAddHistory', item);
  store.dispatch('app/useSearchText', inputValue);
};
</script>
