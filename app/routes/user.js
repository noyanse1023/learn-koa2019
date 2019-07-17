const Router = require('koa-router')
const { find, findById, create, update, del } = require('../controllers/user')

const router = new Router({ prefix: '/user' }) // 给路由加前缀


router.get('/', find)

router.get('/:id', findById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', del)

module.exports = router
