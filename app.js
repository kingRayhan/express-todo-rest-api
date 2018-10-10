// Express
const express = require('express')
const app = express()

// Body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const TodoController = require('./controllers/todosController')

app.get('/api/todos', TodoController.index)
app.get('/api/todos/:id', TodoController.show)
app.post('/api/todos', TodoController.store)
app.delete('/api/todos/:id', TodoController.destroy)

module.exports = app
