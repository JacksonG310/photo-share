<template>
  <div class="h-screen">
    <Header class="h-headerPC"></Header>
    <div class="h-mainPC">
      <Main></Main>
    </div>
    <Floating class="fixed bottom-10 right-2"></Floating>
  </div>
</template>

<script setup>
import Header from './components/header/index.vue';
import Main from './components/main/index.vue';
import Floating from './components/floating/index.vue';
</script>
