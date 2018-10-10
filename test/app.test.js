const request = require('supertest')
const app = require('../app')
const Todo = require('../models/Todo')
const User = require('../models/User')

const todos = [
    { text: 'First todo' },
    { text: 'Second todo' },
    { text: 'Third todo' },
]

beforeEach(done => {
    Todo.deleteMany({})
        .then(() => {
            return Todo.insertMany(todos)
        })
        .then(() => done())
})

describe('POST /api/todos', () => {
    test('should create a new todo', done => {
        const text = 'This is text Todo ' + Date.now()
        request(app)
            .post('/api/todos')
            .send({ text })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                })
                done()
            })
    })

    test('should not create a todo with invalid body data', done => {
        request(app)
            .post('/api/todos')
            .send({ test: '' })
            .expect(400)
            .end((err, res) => {
                if (err) return done(err)

                Todo.find({}).then(todos => {
                    expect(todos.length).toBe(3)
                    done()
                })
            })
    })
})

describe('GET /api/todos', () => {
    test('should get all todos', done => {
        request(app)
            .get('/api/todos')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body.length).toBe(3)
                done()
            })
    })
})

describe('GET /api/todos/:id', () => {
    test('should get a single todo by id', done => {
        const text = 'single todo'

        new Todo({ text }).save().then(doc => {
            const _id = doc._id

            request(app)
                .get('/api/todos/' + _id)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err)
                    Todo.findOne({ _id }).then(doc => {
                        expect(doc.text).toBe(text)
                        done()
                    })
                    done()
                })
        })
    })
})

describe('DELETE /api/todos/:id', () => {
    test('should delete single todo by id', done => {
        const text = 'single todo for delete'

        // Create a new todo
        new Todo({ text }).save().then(doc => {
            // Grab newly created todo's objectId
            const _id = doc._id

            // Delete that todo
            Todo.deleteOne({ _id }).then(deleted => {
                request(app)
                    .get('/api/todos/' + _id)
                    .expect(200)
                    .end((err, res) => {
                        // expect for now doc for that objectID
                        expect(res.body).toEqual({})
                    })
            })

            done()
        })
    })
})
