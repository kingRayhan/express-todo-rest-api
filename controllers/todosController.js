const Todo = require('../models/Todo')
module.exports = {
    index: (req, res) => {
        Todo.find({})
            .then(todos => {
                res.send(todos)
            })
            .catch(e => res.status(400).send(e))
    },
    show: (req, res) => {
        Todo.findById(req.params.id)
            .then(todo => res.send(todo))
            .catch(e => res.status(400).send(e))
    },
    store: (req, res) => {
        new Todo(req.body)
            .save()
            .then(result => {
                res.send(result)
            })
            .catch(e => {
                res.status(400).send(e)
            })
    },
    destroy: (req, res) => {
        Todo.deleteOne({ _id: req.params.id })
            .then(d => {
                res.send(d)
            })
            .catch(e => {
                res.status(400).send(e)
            })
    },
}
