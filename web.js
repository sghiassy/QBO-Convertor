const express = require('express')
const app = express()
const logger = require('morgan')
const path = require('path')
const serveStatic = require('serve-static')

app.use(logger('dev'))

app.get('/test', (req, res) => {
  res.send('Hello World from QBO Converter')
})

app.use(serveStatic(path.join(__dirname, '/build'), {
  maxAge: '1d'
}))

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}!`))