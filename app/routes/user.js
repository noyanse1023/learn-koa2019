const Router = require('koa-router')
const { find, findById, create, update, del, login } = require('../controllers/user')
const jsonwebtoken = require('jsonwebtoken')
const router = new Router({ prefix: '/user' }) // 给路由加前缀

const auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer', '')
    try {
        const user = jsonwebtoken.verify(token.secret)
        ctx.state.user = user    
    } catch(err) {
        ctx.throw(401)
    }
    await next()
}
const checkOwner = async (ctx, next) => {
    if (ctx.params.id !== ctx.state.user._id) {
        // 如果请求的id 与登录的不是同一个
        ctx.throw(403, '没权限')
    }
    await next()
}

router.get('/', find)

router.get('/:id', findById)

router.post('/', create)

router.patch('/:id', auth, checkOwner, update) // patch 只修改部分

router.delete('/:id', del)

router.post('/', login)

module.exports = router
