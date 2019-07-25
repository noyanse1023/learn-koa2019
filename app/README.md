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

