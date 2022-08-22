/**
 * 获取元素中的img
 * @param {HTMLElement[]} 瀑布流中所有的元素
 * @return {HTMLImageElement[]} 瀑布流中的所有img元素
 * 
 */
export const getImgElement = (itemElements) => {
    const imgElements = [];
    itemElements.forEach((el) => {
        imgElements.push(...el.getElementsByTagName('img'));
    })
    return imgElements;
}

/**
 * 获取所有的src属性
 * @param {HTMLImageElement[]} 瀑布流中的所有img元素 
 * @returns {String[]} 瀑布流中的所有的src
 */
export const getAllImgSrc = (imgElements) => {
    return imgElements.map(imgElement => imgElement.src);
}

/**
 * 监听图片加载完成
 * @param {String[]}  瀑布流中的所有的src
 * @return {Promise}
 */
export const onCompleteImgs = (imgs) => {
    const promiseAll = [];
    imgs.forEach((src, index) => {
        promiseAll[index] = new Promise((resolve, reject) => {
            const imgObj = new Image();
            imgObj.src = src;
            imgObj.onload = () => {
                resolve({
                    src,
                    index
                })
            }
        })
    })
    return Promise.all(promiseAll);
};
/**
 * 获取列高对象中最小的列的高度
 * @param {Object}每列的高度度记录
 * @return {String} 列高对象的最小值
 */
export const getMinHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj);
    return Math.min.apply(Math, columnHeightArr);
};
/**
 * 获取列高对象中最大的列的高度
 * @param {Object}每列的高度度记录
 * @return {String} 列高对象的最大值
 */
export const getMaxHeight = (columnHeightObj) => {
    const columnHeightArr = Object.values(columnHeightObj);
    return Math.max.apply(Math, columnHeightArr);
};
/**
 * 获取最小高度的列
 * @param {Object} 每列的高度度记录
 * @return { String } 每列的最小高度 
 */
export const getMinHeightColumn = (columnHeightObj) => {
    const minHeight = getMinHeight(columnHeightObj);
    return Object.keys(columnHeightObj).find(key => columnHeightObj[key] === minHeight);
};