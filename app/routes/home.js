const Router = require('koa-router')
const { index, upload, test } = require('../controllers/home')

const router = new Router()

router.get('/',index)
router.post('/upload', upload)
router.post('/test', test)

module.exports = router