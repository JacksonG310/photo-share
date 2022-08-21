module.exports = function(app) {
    app.get('/pexels', (req, res) => {
        const { page, size } = req.query;
        const startIndex = page * size;
        const endIndex = (page + 1) * size;
        const listData = list.slice(startIndex, endIndex);
        console.log(page, size);
        const result = {
            code: 200,
            data: { list: listData },
            page: "2",
            size: "20",
            total: 533,
            message: "success",
            success: true
        }
        console.log(listData);
        res.send(result)
    })
}