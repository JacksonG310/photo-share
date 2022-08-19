<template>
  <mobileNavigation v-if="isMobile" :data="categoryData" />
</template>
<script setup>
import { isMobile } from '@/utils/isMobile';
import { getCategory } from '@/api/category';
import { ALL_CATEGORY_ITEM } from '@/constants';
import mobileNavigation from './mobile/index.vue';
import { ref } from 'vue';

const categoryData = ref([]);
const getCategoryData = async () => {
  const { categories } = await getCategory();
  categoryData.value = categories;
  categoryData.value.unshift(ALL_CATEGORY_ITEM);
};
getCategoryData();
</script>
