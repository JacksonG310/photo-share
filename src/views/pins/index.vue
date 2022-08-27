<template>
  <div class="w-full h-full bg-gray-200">
    <pins :id="$route.params.id"></pins>
  </div>
</template>

<script setup>
import pins from './components/pins.vue';
</script>
