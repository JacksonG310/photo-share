<template>
  <mobileNavigation v-if="isMobile" :data="categoryData" />
</template>
<script setup>
import { isMobile } from '@/utils/isMobile';
import { getCategory } from '@/api/category';
import { ref } from 'vue';
import mobileNavigation from './mobile/index.vue';

const categoryData = ref([]);
const getCategoryData = async () => {
  const { categories } = await getCategory();
  categoryData.value = categories;
  console.log(categoryData.value);
};
getCategoryData();
</script>
