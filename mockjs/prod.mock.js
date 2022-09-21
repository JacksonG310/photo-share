const Express = require('express');
const app = new Express();
const mockIndex = require('./index');
const cors = require('cors');
app.use(cors());
app.use(Express.static('./dist'));


mockIndex(app);


app.listen(8080, () => {
    console.log("server is runing at 8080");
})