const mongoose = require('../db/mongoose')

module.exports = mongoose.model('User', {
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
        trim: true,
        minlength: 5,
    },
})
