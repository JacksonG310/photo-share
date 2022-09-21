const list = require('./list');
const axios = require('axios');
const { processTheme, processImageList, processImageItem } = require('./utils.js');
module.exports = function(app) {
    app.get('/category', (req, res) => {
        const categoryData = {
            code: 200,
            data: {
                categories: [
                    { id: "web_app_icon", name: "UI/UX", col: 1, urlname: "web_app_icon" }, { id: "design", name: "平面", col: 1, urlname: "design" },
                    { id: "illustration", name: "插画/漫画", col: 1, urlname: "illustration" },
                    { id: "photography", name: "摄影", col: 2, urlname: "photography" },
                    { id: "games", name: "游戏", urlname: "games" },
                    { id: "anime", name: "动漫", urlname: "anime" },
                    { id: "industrial_design", name: "工业设计", col: 2, urlname: "industrial_design" },
                    { id: "architecture", name: "建筑设计", urlname: "architecture" },
                    { id: "art", name: "人文艺术", urlname: "art" },
                    { id: "home", name: "家居/家装", col: 1, urlname: "home" },
                    { id: "apparel", name: "女装/搭配", col: 1, urlname: "apparel" },
                    { id: "men", name: "男士/风尚", col: 2, urlname: "men" },
                    { id: "modeling_hair", name: "造型/美妆", urlname: "modeling_hair" },
                    { id: "diy_crafts", name: "手工/布艺", urlname: "diy_crafts" },
                    { id: "food_drink", name: "美食", urlname: "food_drink" },
                    { id: "travel_places", name: "旅行", urlname: "travel_places" },
                    { id: "wedding_events", name: "婚礼", col: 2, urlname: "wedding_events" },
                    { id: "kids", name: "儿童", urlname: "kids" },
                    { id: "pets", name: "宠物", urlname: "pets" },
                    { id: "quotes", name: "美图", urlname: "quotes" },
                    { id: "people", name: "明星", urlname: "people" },
                    { id: "beauty", name: "美女", urlname: "beauty" },
                    { id: "desire", name: "礼物", urlname: "desire" },
                    { id: "geek", name: "极客", urlname: "geek" },
                    { id: "data_presentation", name: "数据图", urlname: "data_presentation" },
                    { id: "cars_motorcycles", name: "汽车/摩托", urlname: "cars_motorcycles" },
                    { id: "film_music_books", name: "电影/图书", urlname: "film_music_books" },
                    { id: "tips", name: "生活百科", urlname: "tips" },
                    { id: "education", name: "教育", urlname: "education" },
                    { id: "sports", name: "运动", urlname: "sports" },
                    { id: "funny", name: "搞笑", urlname: "funny" }
                ]
            },
            message: "success",
            success: true
        }
        res.send(categoryData);
    })
    app.get('/pexels/list', (req, res) => {
        let { page, size, categoryId, keyword } = req.query;
        page = Number(page);
        size = Number(size);
        if (!keyword) {
            let data = list;
            if (categoryId && categoryId != 'all') {
                data = list.filter(item => item.tags.includes(categoryId));
            }
            const startIndex = (page - 1) * size;
            const endIndex = (page) * size >= data.length ? data.length : (page + 1) * size;
            console.log(page, size, endIndex);
            const listData = data.slice(startIndex, endIndex);
            const result = {
                code: 200,
                data: {
                    list: listData,
                    total: data.length,
                },
                page,
                size,
                message: "success",
                success: true,
                startIndex,
                endIndex
            }
            res.send(result)
        } else {
            const endcodeKeyword = encodeURI(keyword);
            const url = `https://www.pexels.com/zh-cn/api/v3/search/photos?page=${[page]}&per_page=${size}&query=${endcodeKeyword}&orientation=all&size=all&color=all`;
            axios.get(url, {
                headers: {
                    'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr'
                }
            }).then(({ data }) => {
                const imageList = processImageList(data);
                const result = {
                    code: 200,
                    data: {
                        list: imageList,
                        total: 1000
                    },
                    page,
                    size,
                    message: 'success',
                    success: true
                }
                res.send(result)
            }).catch((e) => {
                console.log(e);
            })
        }
    })
    app.get("/pexels/theme", (req, res) => {
        const url = `https://www.pexels.com/zh-cn/api/v3/search/trending?/`
        axios.get(url, {
            headers: {
                'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr'
            }
        }).then(({ data }) => {
            const list = processTheme(data);
            const result = {
                success: true,
                code: 200,
                data: {
                    themes: list
                },
                message: "success"
            }
            res.send(result);
        })
    });
    app.get("/pexels/suggestions/:keyword", (req, res) => {
        const { keyword } = req.params;
        const endcodeKeyword = encodeURI(keyword);
        const url = `https://www.pexels.com/zh-cn/api/v3/search/suggestions/${endcodeKeyword}`;
        axios.get(url).then(({ data }) => {
            const suggestions = data.data.attributes.suggestions;
            const result = {
                code: 200,
                data: suggestions,
                message: 'success',
                success: true
            }
            res.send(result);
        }).catch((e) => {
            console.log(e);
        });
    })
    app.get("/pexels/:id", (req, res) => {
        const { id } = req.params;
        const url = `https://www.pexels.com/zh-cn/api/v3/media/${id}`
        axios.get(url, {
            headers: {
                'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr'
            }
        }).then(({ data }) => {
            const imageItem = processImageItem(data);
            const result = {
                code: 200,
                data: imageItem,
                message: "success",
                success: true,
            }
            res.send(result);
        })

    })
    app.get("/pexels/search", (req, res) => {
        const { keyword, pageNum = 1, pageSize = 20 } = req.query;
        const endcodeKeyword = encodeURI(keyword);
        const url = `https://www.pexels.com/zh-cn/api/v3/search/photos?page=${pageNum}&per_page=${pageSize}&query=${endcodeKeyword}&orientation=all&size=all&color=all`;
        axios.get(url, {
            headers: {
                'secret-key': 'H2jk9uKnhRmL6WPwh89zBezWvr'
            }
        }).then(({ data }) => {
            const imageList = processImageList(data);
            const result = {
                code: 200,
                data: imageList,
                message: 'success',
                success: true
            }
            res.send(result)
        }).catch((e) => {
            console.log(e);
        })
    })
}