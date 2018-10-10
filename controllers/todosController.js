const Todo = require('../models/Todo')

const create = (req, res) => {
    new Todo(req.body)
        .save()
        .then(result => {
            res.send(result)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

const index = (req, res) => {
    Todo.find({})
        .then(todos => {
            res.send(todos)
        })
        .catch(e => res.status(400).send(e))
}

module.exports = { create, index }
