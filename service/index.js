import Koa from 'koa'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import koaStatic from 'koa-static'
import koaParameter from 'koa-parameter'
import koaBody from 'koa-bodyparser'
import router from './router/index.js'

const app = new Koa()

// 静态资源
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaBody())
app.use(koaParameter(app))

// 错误拦截
app.use(async (ctx, next) => {
    try {
        // 执行后面的中间件
        await next()
    } catch(e) {
        ctx.body = { code: 500, msg: 'server error' }
    }
})

// 路由导航
app.use(router.routes())
app.use(router.allowedMethods())

// Not Found
app.use(async (ctx) => {
    ctx.body = { code: 404, msg: 'Not Found' }
})

const params = process.argv.slice(2)
const port = params[0] || 3170

app.listen(port, () => {
    console.log(`服务已运行启动: http://localhost:${port}`)
})
