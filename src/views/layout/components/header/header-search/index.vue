<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        {{ inputValue }}
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue';

let inputValue = ref('');
</script>
