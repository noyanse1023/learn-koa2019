
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

##### 构成
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

##### 特点
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

