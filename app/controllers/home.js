// const fs = require('fs')
const path = require('path')
/**
 * @description 重构控制器
 */
class HomeCtl {
    index(ctx) {
        ctx.body = '这是主页'
    }
    upload(ctx) {
        // 获取上传文件
        console.log('file info', ctx.request.files)
        const file = ctx.request.files.file
        const basename = path.basename(file.path) // basename 接收一个绝对路径，并返回basename
        // ctx.origin 就是 localhost:3000
        ctx.body = { path: `${ctx.origin}/uploads/${basename}` }

          // 上传单个文件
        // const file = ctx.request.files.file; // 获取上传文件
        // // 创建可读流
        // const reader = fs.createReadStream(file.path);
        // let filePath = path.join(__dirname, 'public/uploads/') + `/${file.name}`;
        // // 创建可写流
        // const upStream = fs.createWriteStream(filePath);
        // // 可读流通过管道写入可写流
        // reader.pipe(upStream);
        // ctx.body = "上传成功！";
    }
}

module.exports = new HomeCtl() // 实例化之后会变成对象
