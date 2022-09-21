function processTheme(data) {
    const themeList = data.data;
    const len = themeList.length >= 7 ? 7 : themeList.length;
    return themeList.splice(0, len).map(item => {
        item.attributes.image_url = item.attributes.image_url + '?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=250&w=360'
        return {
            id: item.attributes.photo_id,
            photo: item.attributes.image_url,
            title: item.attributes.term,
        }
    })
}

function processImageList(data) {
    const imageList = data.data;
    return imageList.map((item) => {
        const { attributes } = item;
        return {
            author: attributes.user.username,
            authorLike: '',
            avatar: attributes.user.avatar.small,
            photo: attributes.image.medium,
            photoDownLink: attributes.image.download_link,
            photoHeight: attributes.height,
            photoLink: '',
            photoType: 'jpg',
            photoWidth: attributes.width,
            tags: attributes.tags,
            title: attributes.title,
            _v: 0,
            _id: attributes.id,
            id: attributes.id
        }
    })
}

function processImageItem(data) {
    const item = data.data;
    const { attributes } = item;
    return {
        author: attributes.user.first_name,
        authorLike: '',
        avatar: attributes.user.avatar.small,
        photo: attributes.image.medium,
        photoDownLink: attributes.image.download_link,
        photoHeight: attributes.height,
        photoLink: '',
        photoType: 'jpg',
        photoWidth: attributes.width,
        tags: attributes.tags,
        title: attributes.title,
        _v: 0,
        _id: attributes.id,
        id: attributes.id
    }
}

module.exports = {
    processImageList,
    processTheme,
    processImageItem
}