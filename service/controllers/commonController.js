class CommonController {
    async getUserList (ctx) {
        const { id } = ctx.params
        const query = ctx.query
        console.log(id, query)
        // const sql = id
        //     ? `select * from user where userid = ${id}`
        //     : `select * from user ${handleQuerySql(query)}`
        // // todo add userDao.getUserList()
        // const result = await searchSql(sql)
        // result.data = convertHumpFormat(result.data, UserColumn)
        ctx.body = 'test'
    }
}
