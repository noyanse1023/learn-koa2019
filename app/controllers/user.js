// const db = [{ name: 'argen' }]
const User = require('../models/user')
const jsonwebtoken = require('jsonwebtoken')
const { serect } = require('../config')
const errorMessage = {
    message: '用户不存在'
}

class UserCtrl {
    async find(ctx) {
        const user = await User.find()
        ctx.body = user
    }
    async findById(ctx) {
        const { fields } = ctx.query
        console.log('find by id', fields)
        // 把 f 不存在的字段过滤掉
        const selectFields = fields.split(';').filter(f => f).map(item => ' +' + item).join('')
        const user = await User.findById(ctx.params.id).select(selectFields) // +employments +educations
        if (!user) ctx.throw(404, errorMessage)
        ctx.body = user
    }
    async create(ctx) {
        console.log('request body ---', ctx.request.body)
        // db.push(ctx.request.body)
        const user = await new User(ctx.request.body).save()
        ctx.body = user
    }
    async update(ctx) {
        // db[ctx.params.id * 1] = ctx.request.body
        ctx.verifyParams({
            name: { type: 'string', required: true },
            avatar_url: { type: 'string', required: false },
            locations: { type: 'array', itemType: 'string', required: false},
            employments: { type: 'array', itemType: 'object', required: false}
        })
        const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
        if (!user) ctx.throw(404, errorMessage)
        ctx.body = user
    }
    async del(ctx) {
        // db.splice(ctx.params.id * 1, 1)
        const user = await User.findByIdAndRemove(ctx.params.id)
        // ctx.status = 204
        if (!user) ctx.throw(404, errorMessage)
    }
    async login(ctx) {
        console.log('login', ctx.params.id)
        const user = User.findOne(ctx.params.id)
        const { _id, name } = user
        const token = jsonwebtoken.asign({ _id, name }, serect, { exprieIn: '1d' })
        ctx.body = { token }
    }
}

module.exports = new UserCtrl()