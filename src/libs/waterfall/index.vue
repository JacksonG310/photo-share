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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import {
  getImgElement,
  getAllImgSrc,
  onCompleteImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils';

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
// 1、计算容器总高度
const containerHeight = ref(0); // 容器宽度
const columnHeightObj = ref({}); // 记录每列高度的数据结构,key:所在列，val：当前列高度
// 初始化每列高度记录表
const useColumnHeightObj = () => {
  columnHeightObj.value = {};
  for (let i = 0; i < props.columns; i++) {
    columnHeightObj.value[i] = 0;
  }
};

// 2、计算列的宽度
const containerTarget = ref(null); // 容器实例
const containerWidth = ref(0); // 容器总宽度（内容总宽度，不包含padding、margin、border）
const containerLeft = ref(0); // 容器左边距，用于计算item的left
// 计算容器宽度
const useContainerWidth = () => {
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  );
  containerLeft.value = parseFloat(paddingLeft);
  containerWidth.value =
    containerTarget.value.offsetWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight);
};
const columnWidth = ref(0); // 列宽
// 计算列间距的总宽度
const columnSpacingTotal = computed(() => {
  return (props.columns - 1) * props.columnSpacing;
});
// 计算列宽
const useColumnWidth = () => {
  useContainerWidth();
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.columns;
};
// 挂载时计算宽度
onMounted(() => {
  useColumnWidth();
});

// 图片预加载，用于计算item宽高
let itemHeights = []; // item高度集合
// 监听图片加载完成(图片预加载)
const useImgLoadComplete = () => {
  itemHeights = [];
  const itemElements = [...document.getElementsByClassName('m-waterfall-item')]; // 拿到所有的元素
  const imgElements = getImgElement(itemElements); // 获取元素的img标签
  const allImgSrc = getAllImgSrc(imgElements); // 获取img元素src属性,用于监听图片加载
  onCompleteImgs(allImgSrc).then(() => {
    // 图片加载完成
    itemElements.forEach((el) => {
      itemHeights.push(el.offsetHeight);
    });
    useItmeLocation();
  });
};

// 不需要图片预加载
const useItemHeight = () => {
  itemHeights = [];
  const itemElements = [...document.getElementsByClassName('m-waterfall-item')];
  itemElements.forEach((el) => {
    itemHeights.push(el.offsetHeight);
  });
  useItmeLocation();
};

// 计算元素位置
const useItmeLocation = () => {
  props.data.forEach((item, index) => {
    if (item._style) return; // 避免重复计算
    item._style = {}; // 生成_style属性
    item._style.left = getItemLeft();
    item._style.top = getItemTop();
    increaseColumnHeight(index); // 增加列高度
    containerHeight.value = getMaxHeight(columnHeightObj.value); // 增加容器高度
  });
};

// 返回下一个item的left
const getItemLeft = () => {
  // 拿到最小高度的列
  const column = getMinHeightColumn(columnHeightObj.value);
  return (
    column * (columnWidth.value + props.columnSpacing) + containerLeft.value
  );
};

// 返回下一个item的top
const getItemTop = () => {
  // 拿到最小高度的列
  return getMinHeight(columnHeightObj.value);
};

// 增加列高度
const increaseColumnHeight = (index) => {
  // 最小高度所在的列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value);
  // 使该列自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing;
};
// 组件销毁时，清除所有的_style
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style;
  });
});

// 监听数据变化
watch(
  () => props.data,
  (newVal) => {
    nextTick(() => {
      const resetColumnHeight = newVal.every((item) => !item._style);
      if (resetColumnHeight) {
        // 构建高度记录
        useColumnHeightObj();
      }
      if (props.picturePreLoading) {
        useImgLoadComplete();
      } else {
        useItemHeight();
      }
    });
  },
  {
    deep: true,
    immediate: true
  }
);

// 监听行数变化
watch(
  () => props.columns,
  (newValue) => {
    if (props.picturePreLoading) {
      // 宽度变为0，就会停止渲染
      columnWidth.value = 0;
    }
    reset();
  }
);

const reset = () => {
  setTimeout(() => {
    // 重新计算列宽
    nextTick(() => {
      useColumnWidth();
      props.data.forEach((item) => {
        // 修改数据，让上方的watch能够监听到
        item._style = null;
      });
    });
  }, 200);
};
</script>
