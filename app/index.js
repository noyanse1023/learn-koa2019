const Koa = require('koa')
// const bodyparser = require('koa-bodyparser')
const router = require('./routes')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const mongoose = require('mongoose')
const { dbUrl } = require('./config')
const path = require('path')
const parameter = require('koa-parameter');

mongoose.connect(dbUrl, { useNewUrlParser: true }, () => {
    console.log('数据库连接成功')
})
mongoose.connection.on('error', () => {
    console.log('数据库连接失败')
})

const app = new Koa()

app.use(koaStatic(path.join(__dirname, 'public')))

app.use(parameter(app))
// app.use(bodyparser()) // 解析post请求
app.use(koaBody({
    multipart: true, // 启用文件，支持文件的格式
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        // 保留拓展名, 默认是 false
        keepExtensions: true
    }
}))
// app.use(koaBody({
//     multipart: true,
//     formidable: {
//         maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
//     }
// }))

router(app)

app.listen(3000, () => {
    console.log('your server is listening at port 3000')
}) 