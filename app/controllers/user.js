const db = [{ name: 'argen' }]

class UserCtrl {
    find(ctx) {
        ctx.body = db
    }
    findById(ctx) {
        ctx.body = db[ctx.params.id * 1]
    }
    create(ctx) {
        console.log('request body ---', ctx.request.body)
        db.push(ctx.request.body)
        ctx.body = ctx.request.body
    }
    update(ctx) {
        db[ctx.params.id * 1] = ctx.request.body
        tx.body = ctx.request.body
    }
    del(ctx) {
        db.splice(ctx.params.id * 1, 1)
        ctx.status = 204
    }
}

module.exports = new UserCtrl()