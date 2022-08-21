<template>
  <mobileNavigation v-if="isMobile" />
  <pcNavigation v-else />
</template>
<script setup>
import { isMobile } from '@/utils/isMobile';
// import { getCategory } from '@/api/category';
// import { ALL_CATEGORY_ITEM } from '@/constants';
import mobileNavigation from './mobile/index.vue';
import pcNavigation from './pc/index.vue';
import { useStore } from 'vuex';

// const categoryData = ref([]);
// const getCategoryData = async () => {
//   const { categories } = await getCategory();
//   categoryData.value = categories;
//   categoryData.value.unshift(ALL_CATEGORY_ITEM);
// };
// getCategoryData();
const store = useStore();
store.dispatch('category/useCategoryData');
</script>
