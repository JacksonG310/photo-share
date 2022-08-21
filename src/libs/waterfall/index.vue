<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          top: item._style?.top + 'px',
          left: item._style?.left + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
    <!-- 加载提示 -->
    <div v-else></div>
  </div>
</template>

<script setup>
const props = defineProps({
  // 数据源
  data: {
    type: Array,
    required: true
  },
  // 唯一标识
  nodeKey: String,
  // 列数
  columns: {
    type: Number,
    default: 2
  },
  // 列间距
  columnSpacing: {
    type: Number,
    default: 20
  },
  // 行间距
  rowSpacing: {
    type: Number,
    default: 20
  },
  // 是否需要进行图片预加载
  picturePreLoading: {
    type: Boolean,
    default: true
  }
});
</script>
