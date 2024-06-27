import Router from 'koa-router'
import commonRouter from './common/index.js'

const router = new Router()

router.prefix('/api')

router.use('/common', commonRouter.routes(), commonRouter.allowedMethods())

export default router
