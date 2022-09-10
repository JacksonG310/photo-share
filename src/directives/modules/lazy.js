import { useIntersectionObserver } from "@vueuse/core"

export default {
    // 图片懒加载
    mounted(el) {
        const imgSrc = el.src;
        el.src = '';
        const { stop } = useIntersectionObserver(el, ([IntersectionObserverEntry]) => {
            const { isIntersecting } = IntersectionObserverEntry;
            if (isIntersecting) {
                el.src = imgSrc;
                stop();
            }
        })
    },
}