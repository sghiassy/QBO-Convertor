const ONEDAY = 86400000;

const express = require('express')
const app = express()
const logger = require('morgan')

app.use(logger('dev'))

app.get('/test', (request, response) => {
  response.send('Hello World from Heroku')
})

// app.use('/', express.static(), {maxAge: ONEDAY});
app.use('/', express.static(__dirname + '/build'))

const port = process.env.PORT || 9000;

app.listen(port, () => console.log(`Listening on port ${port}!`))