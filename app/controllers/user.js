// const db = [{ name: 'argen' }]
const { User } = require('../models/user')
const errorMessage = {
    message: '用户不存在'
}

class UserCtrl {
    async find(ctx) {
        const user = await User.find()
        ctx.body = user
    }
    async findById(ctx) {
        const user = await User.findById(ctx.params.id)
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
}

module.exports = new UserCtrl()