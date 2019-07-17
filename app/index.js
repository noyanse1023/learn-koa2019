const Koa = require('koa')
const router = require('./routes')

const app = new Koa()

router(app)

app.listen(3000, () => {
    console.log('your server is listening at port 3000')
})