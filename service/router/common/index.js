import Router from 'koa-router'

const router = new Router()

router.get('/info', (ctx) => {
    ctx.body = {
        id: 0,
        name: 'xxx'
    }
})

export default router
