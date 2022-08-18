import { computed } from "vue";
import { PC_DEVICE_WIDTH } from "@/constants";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
/*
    判断是否为移动设备
    判断是否超过指定宽度
*/
export const isMobile = computed(() => {
    return width.value < PC_DEVICE_WIDTH;
})