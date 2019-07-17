/**
 * @description 重构控制器
 */
class HomeCtl {
    index(ctx) {
        ctx.body = '这是主页'
    }
}

module.exports = new HomeCtl() // 实例化之后会变成对象
