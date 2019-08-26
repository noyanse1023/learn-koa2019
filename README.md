

# 错误处理
koa 对于找不到的会自动返回404错误
可以用ctx.throw(412) 跑出错误码

# 编写错误处理中间件
把错误处理的中间件放在中间件链条的最前面
```
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        // 运行时错误，都返回500
        ctx.status = err.status || status.statusCode || 500
        // ctx.body = err.message // 最好返回json形式
        ctx.body = {
            message: err.message
        }
    }
})
```
# koa-json-error
返回json信息的错误处理中间件

跨平台 变量中间件 cross-env
在package.json中设置 模拟生产环境
    "start": "cross-env NODE_ENV=production node app"

# koa -parameter 校验参数中间件
```
const parameter = require('koa-parameter')

app.use(parameter(app)) // ctx加一个全局的方法帮助我们校验参数

ctx.verifyParams({
    name: { type: 'string', required: true } // required 默认为true 可不写
})
```

# 博客地址
https://www.jianshu.com/u/84e78d51ad4e


git clone https://github.com/r0oth3x49/udemy-dl.git

cd udemy-dl

pip install -r requirements.txt

python udemy-dl.py 课程地址 -o "存放目录" -q 720 -c 章节编号 -l 章节中课程编号

python udemy-dl.py https://www.udemy.com/ios11-app-development-bootcamp/learn/v4/t/lecture/7626360 -o /Users/chang/Desktop/sketch -q 720 -c 35 -l 8

下载  https://www.udemy.com/ios11-app-development-bootcamp/learn/v4/t/lecture/7626360 课程的第 35 章节的第 8 课到本地目录 /Users/chang/Desktop/sketch 下。视频清晰度为 720。
如果想下载 1080 视频，把 720 改成 1080 即可

python udemy-dl.py https://www.udemy.com/complete-python-bootcamp/learn/lecture/3421822 -o F:\udemy\learn-python -q 720 -c 1 -l 1

=======

# 云数据库---mongodb Atlas
1. 注册用户
2. 创建集群
3. 添加数据库用户
4. 设置IP地址白名单
5. 获取连接地址
## 实操步骤
- www.mongodb.com -- products -- cloud -- mongodb Atlas (https://www.mongodb.com/cloud/atlas)
- 按照get stated 做就好 aws - 选新加坡地址 - 默认存储 - 按照mongodb4.0 - 集群名称要自定义一下，一旦创建就不能修改
- 创建第一个集群是免费的，如果再创建第二个集群就要收费了
- 创建数据库
- 创建用户
- 添加IP地址，选择可以从任何地方访问

# 连接数据库
```
const mongoose = require('mongoose')
mongoose.connect(dbUrl, { useNewUrlParser: true }, () => {
    console.log('数据库连接成功')
})
mongoose.connection.on('error', () => {
    console.log('数据库连接失败')
})
```

# 设计用户模块的 Schema (json的数据结构)
1. 分析用户模块的属性
2. 编写用户模块的 Schema
3. 使用Schema 生成用户 Model (MVC中的 Model,通常用于一些数据库的操作)
```
Schema 应该放在 models文件夹下
+ models
const mongoose = require('mongoose')
const { Schema, model } = mongoose // 可以用这个生成文档 Schema
// 可以设计出非常复杂的嵌套结构
const userSchema = new Schema({
    name: {type: String, required: true},
    age: {type: Number, default: 0}
})

module.exports = model('User', userSchema) // model 可以来操作数据
```
# 用Mongoose类库实现增删改查接口
- User.find()
- User.findById(id)
- new User(ctx.request.body).save()
- User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
- User.findByIdAndRemove(ctx.params.id)
- User.findOne(ctx.params.id)
```
const User = require('../models/users')
async find(ctx) {
    ctx.body = await User.find()
}
```

# 认证与授权
### session
1. 客户端发起请求，携带用户名和密码，服务端接到请求后，生成session数据，保存在内存或者数据库（如redis）中，并把sessionId 返回给前端。

2. 前端拿到sessinId后存在cookie中，set-cookie 不止有sessionId还有domain

3. 客户端在发起请求，验证session

**前端想重新登录，清除缓存即可，后端想重新登录清楚session即可**

##### 优点：
1. 相比JWT可主动清除cookie
2. session 保存在服务端，相对安全
3. 结合cookie使用，灵活，兼容性好

##### 缺点：
1. cookie + session 跨域场景表现不好
2. 如果分布式部署，要做多机共享机制
3. 查询session信息可能有数据库操作

### JWT
> 1. JSON Web Token 是一个开放的标准(RFC 7519)
2. 紧密且独立，作为JSON对象传输
3. 该信息可验证和信任，经过数字签名

##### JWT构成
1. 头部(Header)
    - typ: token类型，定义为 JWT
    - alg: 使用hash算法，如 HMAC SHA256 RSA
    - 最后用 base64Url 编码了一下
2. 有效载荷(Payload)
    - 存储要传递的信息，如用户id, 用户名等
    - 还包含元数据，如过期时间， 发布人等
    - 与header不同，可加密
3. 签名(Signature)
    - Header 和 Payload 部分进行签名
    - 保证token在传输过程中没有被篡改或损坏

##### JWT特点
1. 通过令牌校验 无状态
2. RESTful API
3. JWT 性能不好，包含HTTP中完整的信息
4. 时效性， JWT只能在过期后清除，不能主动销毁， 不如 session

```
const jwt = require('jsonwebtoken')
const token = jwt.sign({ name: 'lulu', secret }) // 生成签名
jwt.verify(token) // 经过校验的解码
```

>JWT最主要就是解决跨域问题，存储在客户端，服务端无状态的

# 上传图片
- 用户头像
- 封面图片
- 问题和回答中的图片(支持富文本，图片可以通过按钮或者复制粘贴来上传)
- 话题图片

## 上传图片的功能点
- 基础功能： 上传图片，生成图片链接
- 附加功能：限制上传图片的大小和类型（加快图片加载）---通常在前端做
 生成图片高中低3中分辨率的图片链接、生成CDN（更好的传输速度）

 ## 上传图片的技术方案
 - 阿里云 OSS 等云服务，推荐在生产环境使用
 - 直接上传到自己的服务器，不推荐在生产环境下使用（不稳定，不支持分布式环境，适合学习）

## 使用 koa-body 中间件获取上传的文件
- 安装 koa-body 替换 koa-bodyparser(koa-bodyparser只支持json和form两种格式的请求体，不支持文件的格式)
- 设置图片上传目录(在注册koa-body中间件时注册的)
- 使用Postman模拟上传文件
```
npm install koa-body --save
npm uninstall koa-bodyparser --save // 卸载koa-bodyparser

const kodBody = require('koa-body')

app.use(kodBody({
    multipart: true, // 启用文件，支持文件的格式
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'),
        // 保留拓展名, 默认是 false
        keepExtensions: true
    }
}))

+ controllers:
class HomeCtl {
    index(ctx) {
        ctx.body = '这是主页'
    }
    upload(ctx) {
        // 获取上传文件
        const file = ctx.request.files.myfile
        ctx.body = { path: file.path }
    }
}
+ routes
    + home.js:
const { index, upload } = require('../controllers/home')

const router = new Router()

router.post('/upload', upload)

```

* postman 里面新建一个 request, 路径为设置的路由，body中选择form-data格式
key 选择file 格式

PS：有点心累，本来这么写的，运行 ctx.request.files就是 undefined 
后来可能改了下中间件的位置，就Ok了，我再改回来，还是ok，简直是迷

## 使用 koa-static 中间件 生成图片链接
> 可以帮我们生成静态服务，指定了一个文件夹，文件夹下所有的文件都可以通过http服务来访问
public 作为静态服务器
1. 安装 koa-static
2. 设置静态文件目录(通常设置在public文件夹下)
3. 生成图片链接, 想办法让这个链接在上传接口中返回给客户端
```
app.use(koaStatic(path.join(__dirname, 'public')))
```
// 图片链接
http://localhost:3000/uploads/upload_05fda00006b536a730d45455dee4d505.png

```
const basename = path.basename(file.path) // basename 接收一个绝对路径，并返回basename
// ctx.origin 就是 localhost:3000
ctx.body = { path: `${ctx.origin}/uploads/${basename}` }
```
public下的所有文件都可以通过http来访问，比如如果想放一个Html前端静态页面，放public下也可以通过http访问

## 编写前端页面上传文件
- 核心就是表单
- 联调测试
```
<form action="/upload" enctype="multipart/form-data" method="POST">
    <input type="file" name='file'>
    <button type="submit">上传</button>
</form>
```

## 限制上传格式
```
<input type="file" name='file' accept='image/png, image/jpeg'> 或者
accept='.png, .jpg, .jpeg'
支持所有图片类型文件
accept='image/*'
```

# 个人资料需求分析
- 不同类型的属性
- 字段过滤

## 个人资料的 Schema 设计 (这里指的是json的数据结构)
- 分析个人资料的数据结构
头像存的是url， 在上传图片的时候,存在服务器上，生成url
```
avatar_url: { type: String }
// 性别：男或女，可枚举字符串 enum 可根据性别给你推荐适合你的产品
gender: { type: String, enum: ['male', 'female'], defaule: 'male', required: true }
headline: { type: String },
locations: { type: [{ type: String }] }, // 字符串数组
business: { type: String }, // 行业
employments: { // 职业经历
    type: [{
        company: { type: String },
        job: { type: String }
    }]
},
educations: {
    type: [{
        school: { type: String },
        major: { type: String },
        diploma: { type: Number }, // 用数字表示学历       
        entrance_year: { type: Number },
        graduation_year: { type: Number }
    }]
}
```

## 个人资料的参数校验
- 请求体的校验
- 分析个人资料的数据结构
- 编写代码校验个人资料参数
通常注册的时候，只填写用户名密码就好，
校验参数的代码写在更新个人资料的接口中

## 字段过滤
- 设置 Schema 默认隐藏字段， 用户列表里面，不能显示太多字段
- 通过查询字符串显示隐藏字段
`select: false` // 设置 Schema 时隐藏字段
```
const { fields } = ctx.query
console.log('find by id', fields)
// 把 f 不存在的字段过滤掉
const selectFields = fields.split(';').filter(f => f).map(item => ' +' + item).join('')
// 把隐藏的字段通过query查询显示出来
const user = await User.findById(ctx.params.id).select(selectFields) // +employments +educations
```
