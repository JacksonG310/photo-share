<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white border-b-gray-200"
    :class="['sticky' ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- left -->
    <div
      class="h-full w-5 absolute left-0 flex items-center justify-center"
      @click="onClickLeft"
    >
      <slot name="left">
        <m-svgIcon name="back" class="w-2 h-2"></m-svgIcon>
      </slot>
    </div>
    <!-- center -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-gray-900"
    >
      <slot></slot>
    </div>
    <!-- right -->
    <div
      class="h-full w-5 absolute right-0 flex items-center justify-center"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  clickLeft: Function,
  clickRight: Function,
  stick: Boolean
});

const router = useRouter();

const onClickLeft = () => {
  if (props.clickLeft) {
    props.clickLeft();
    return;
  }
  router.back();
};

const onClickRight = () => {
  if (props.clickRight) {
    props.clickRight();
    return;
  }
};
</script>
