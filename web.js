const ONEDAY = 86400000

const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')

app.use(logger('dev'))

app.get('/test', (req, res) => {
  res.send('Hello World from Heroku')
})

app.use(serveStatic(path.join(__dirname, '/build'), {
  maxAge: ONEDAY
}))

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}!`))