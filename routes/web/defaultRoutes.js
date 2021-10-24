/***
 * default routes
 */
  const defaultRoutes = async app => {
    app.get('/favicon.ico', (_, reply) => {
        reply.code(404)
        reply.send('')
    })

    app.get('/dashboard', async (req, repl) => {
        return 'testing dashboard'
    })
}

export default defaultRoutes