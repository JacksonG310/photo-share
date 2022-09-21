import request from "../utils/request"
// 获取图片列表数据
export const getPexeplsList = (data) => {
    return request({
        url: '/pexels/list',
        params: data
    })
};
// 获取指定ID的数据
export const getPexeplsById = (id) => {
    return request({
        url: `/pexels/${id}`
    })
}

// 获取关键词推荐
export const getPexeplsSuggest = (keyword) => {
    return request({
        url: `/pexels/suggestions/${keyword}`,
    })
}

// 获取推荐主题
export const getPexeplsTheme = () => {
    return request({
        url: '/pexels/theme'
    })
}

// 获取搜索结果
export const getPexeplsSearch = (keyword) => {
    return request({
        url: 'pexels/search',
        params: {
            keyword
        }
    })
}