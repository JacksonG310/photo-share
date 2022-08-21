<template>
  <Navigation class="h-full overflow-auto bg-white duration-500" />
  <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
    <List></List>
  </div>
</template>

<script setup>
import Navigation from './components/navigation/index.vue';
import List from './components/list/index.vue';
</script>
