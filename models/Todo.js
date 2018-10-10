const mongoose = require('../db/mongoose')
module.exports = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 10,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Number,
        default: null,
    },
})
