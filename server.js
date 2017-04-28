var todos = require('./todos.js')
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

var port = process.env.PORT || 8080

app.get('/', function (request, response) {
  response.json({
    welcome: 'Welcome to Todos!'
  })
})

app.get('/todos', function (request, response) {
  response.json(todos)
})

app.get('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such product: ' + request.params.slug)
    return
  }
  response.json(todos[request.params.slug])
})

app.post('/todos', function (request, response) {
  // we'll create a new product here soon!
  var slug = request.body.name.trim().toLowerCase().split(' ').join('-')
  todos[slug] = {
    name: request.body.name.trim(),
    completed: request.body.completed.trim(),
  }
  response.redirect('/todos/' + slug)
})

app.delete('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such product: ' + request.params.slug)
    return
  }
  delete todos[request.params.slug]
  response.redirect('/todos')
})

app.put('/todos/:slug', function (request, response) {
  if (!todos[request.params.slug]) {
    response.status(404).end('sorry, no such product: ' + request.params.slug)
    return
  }
  var todo = todos[request.params.slug]
  if (request.body.name !== undefined) {
    product.name = request.body.name.trim()
  }
  if (request.body.completed !== undefined) {
    product.completed = request.body.completed.trim()
  }
  response.redirect('/todos')
})

app.use(function (request, response, next) {
  response.status(404).end(request.url + ' not found')
})

app.listen(port)
