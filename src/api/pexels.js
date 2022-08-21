import request from "../utils/request"
// 获取图片列表数据
export const getPexeplsList = (data) => {
    return request({
        url: '/pexels/list',
        params: data
    })
}