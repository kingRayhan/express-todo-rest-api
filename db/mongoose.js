const mongoose = require('mongoose')

require('mongoose-type-email')
mongoose.Promise = global.Promise
// mongoose.set('useCreateIndex', true)
mongoose.connect(
    'mongodb://127.0.0.1:27017/mongoTodo',
    { useNewUrlParser: true }
)
module.exports = mongoose
