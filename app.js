// Express
const express = require('express')
const app = express()

// Body parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const TodoController = require('./controllers/todosController')

app.get('/api/todos', TodoController.index)
app.post('/api/todos', TodoController.create)

module.exports = app
