<template>
  <!-- header -->
  <div
    class="w-full bg-white dark:bg-zinc-800 dark:border-zinc-700 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1"
  >
    <div class="flex items-center">
      <img
        v-lazy
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
