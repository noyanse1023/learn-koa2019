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



# 技能
- js 熟练
- es6 熟练
- Vue 熟练
- React 了解
- Node (koa/express) 熟练
- webpack 熟练

# 工作经验
2018.05 ~ 至今
江苏润和软件
- 根据需求文档和高保真，构建页面效果，划分功能模块
- 根据接口文档进行设计与交互
- 前端页面构建与开发联调
技术点：vue canvas

2016.09~2018.04 
南京厚德软件科技有限公司
- 负责前端项目组技术框架选择与整体框架搭建
- 根据需求与设计完成产品需求
技术点：vue node express koa


# 项目经验
华为云空间
- 优化前端大数据量下的页面渲染，采用分屏渲染技术，前端2W数据下，IE浏览器快速滑动不会卡顿
- 优化前端搜索功能，速度快了十几倍
- 前端控制并发请求，采用blob技术 加快图片展示
- 完成多个页签之间数据变更，及时通知功能
- 根据需求文档等完成各类新需求

IM即时聊天应用
- 使用 node + websoket 技术 支持高并发

个人博客项目
- 注册登录api 编写 jwt鉴权
- 负责前端数据的增删改查
- 图片展示，上传下载

灭火救援数字化预案
- 前端使用jquery技术，操作dom

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