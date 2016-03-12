import {createServer} from 'http'
import {join, dirname} from 'path'
import express from 'express'
import favicon from 'serve-favicon'

import routes from './routes'
import sockets from './sockets'

const app = express()
const server = createServer(app)

const appDir = join(dirname(require.main.filename), '../app')

app.set('views', join(appDir, 'views'))
app.set('view engine', 'jade')
app.use(express.static(join(appDir, 'public')))
app.use(favicon(join(appDir, 'public/img/favicon.ico')))

routes(app, express.Router())
sockets(server)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status)
  res.render('error', {
    title: status,
    message: err.message,
    error: status
  })
})

// old syntax for bin/www
module.exports = {
  app,
  server
}
