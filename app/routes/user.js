const Router = require('koa-router')
const { find, findById, create, update, del, login } = require('../controllers/user')
const jsonwebtoken = require('jsonwebtoken')
const router = new Router({ prefix: '/user' }) // 给路由加前缀

const auth = (ctx, next) => {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer', '')
    try {
        const user = jsonwebtoken.verify(token.secret)
        ctx.state.user = user    
    } catch(err) {
        ctx.throw(401)
    }
}

router.get('/', find)

router.get('/:id', findById)

router.post('/', create)

router.patch('/:id', update) // patch 只修改部分

router.delete('/:id', del)

router.post('/', login)

module.exports = router
