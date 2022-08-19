<template>
  <div class="w-screen bg-white border-b border-b-black-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2"
        @click="handleToHome"
        src="@/assets/logo.png"
        alt=""
      />
      <HeaderSearch class="mr-1"></HeaderSearch>
      <HeaderTheme></HeaderTheme>
      <HeaderMy></HeaderMy>
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './header-search/index.vue';
import HeaderTheme from './header-theme.vue';
import HeaderMy from './header-my.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleToHome = () => {
  router.push('/');
};
</script>
