export default (app, router) => {
  app.use('/', router)

  router.route('/')
    .get((req, res) => {
      res.render('index', {
        title: 'rino - game'
      })
    })
}
